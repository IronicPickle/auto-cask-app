import { GenericErrorCode } from "@shared/enums/api/generic";
import { ApiError } from "@shared/ts/api/generic";
import { log } from "@lib/utils/generic";
import axios, { AxiosError } from "axios";
import config from "@config/config";
import { decode } from "react-native-pure-jwt";
import dayjs from "dayjs";
import refresh from "./auth/refresh";
import { storageManager } from "@src/App";

export const api = axios.create({
  baseURL: config.apiUrl,
});

export const isAxiosError = <K extends string | number | symbol>(
  err: any,
): err is AxiosError<ApiError<K>> => err.isAxiosError;

export const getErrorFromApiErr = <K extends string | number | symbol>(err: any): ApiError<K> => {
  log(err);
  if (isAxiosError<K>(err)) {
    const data = err.response?.data;
    if (data) return data;
  }

  return {
    error: err.message ?? err,
    errorCode: GenericErrorCode.AxiosError,
  } as ApiError<K>;
};

export interface SessionTokens {
  accessToken?: string;
  refreshToken?: string;
}

const getSessionTokens = async () => {
  try {
    const serialisedSession = await storageManager.get<SessionTokens>("session");
    if (!serialisedSession) return {};
    return serialisedSession;
  } catch (_err) {
    return {};
  }
};

const checkTokenHasExpired = async (token: string) => {
  const payload = await decode(token, "null", {
    skipValidation: true,
  });
  if (!payload) return null;

  const { exp } = payload as any;

  if (!exp) return null;

  const expiry = dayjs.unix(exp);

  const diff = expiry.diff();
  const minutesLeft = diff / 1000 / 60;

  const hasExpired = minutesLeft <= 1;

  log(`Current session:\nMinutes left: ${minutesLeft}\nHas Expired: ${hasExpired}`);

  return hasExpired;
};

const refreshAccessToken = async () => {
  try {
    const { refreshToken } = await getSessionTokens();
    if (!refreshToken) return null;

    if (await checkTokenHasExpired(refreshToken)) return null;

    const { accessToken } = await refresh({
      body: { refreshToken },
    });
    return accessToken;
  } catch (err) {
    return null;
  }
};

const getAccessToken = async () => {
  try {
    let { accessToken } = await getSessionTokens();
    if (!accessToken) return null;

    if (await checkTokenHasExpired(accessToken)) {
      log("Session expiring soon, fetching new token");
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) throw new Error("Failed to refresh access token");
      accessToken = newAccessToken;
    }

    return accessToken;
  } catch (err) {
    log(err);
    return null;
  }
};

api.interceptors.request.use(async config => {
  const accessToken = await getAccessToken();

  if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;

  return config;
});

interface ErrorRes {
  error: string;
  errorCode: GenericErrorCode;
  statusCode: number;
}

let isReattempt = false;

api.interceptors.response.use(
  async res => {
    isReattempt = false;

    return res;
  },
  async (error: AxiosError<ErrorRes>) => {
    const originalRequest = error.config;

    if (!originalRequest) return;

    const { errorCode } = error.response?.data ?? {};

    if (
      errorCode === GenericErrorCode.InvalidToken ||
      errorCode === GenericErrorCode.Unauthorized
    ) {
      if (isReattempt) {
        await storageManager.remove("session");
        throw error;
      }

      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        await storageManager.remove("session");
        throw error;
      }

      isReattempt = true;

      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return api(originalRequest);
    }

    throw error;
  },
);
