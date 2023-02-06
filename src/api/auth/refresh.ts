import { api } from "@api/api";
import type { RefreshReq, RefreshRes } from "@shared/ts/api/auth";

export default async ({ refreshToken }: RefreshReq) => {
  const { data } = await api.post<RefreshRes>("/auth/login", {
    refreshToken,
  });
  return data;
};
