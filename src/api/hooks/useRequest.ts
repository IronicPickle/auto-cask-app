import { getErrorFromApiErr } from "@api/api";
import type { ApiError } from "@shared/ts/api/generic";
import { useState } from "react";
import useRequestState, { CurrentReqState } from "./useRequestState";

export type RequestRes<R, D> = {
  data?: R;
  error?: ApiError<keyof D>;
};

export interface UseRequestReturn<D, R> {
  promise: Promise<R | undefined> | undefined;
  send: (reqData: D) => Promise<RequestRes<R, D>>;
  isLoading: boolean;
  error: ApiError<keyof D> | undefined;
  data: R;
  reset: () => CurrentReqState<D, R>;
}

export default <D, R, F = undefined>(
  func: (reqData: D) => Promise<R>,
  defaultValue: F,
): UseRequestReturn<D, R | F> => {
  const { reqState, setIdle, setLoading, setSuccess, setError } = useRequestState<D, R | F>(
    defaultValue,
  );

  const [resPromise, setResPromise] = useState<Promise<R | undefined>>();

  const send = async (reqData: D): Promise<RequestRes<R, D>> => {
    try {
      setLoading();
      const res = func(reqData);
      setResPromise(res);
      const data = await res;
      setSuccess(data);
      return { data };
    } catch (err) {
      const error = getErrorFromApiErr<keyof D>(err);
      setError(error);
      return { error };
    }
  };

  const { isLoading, error, data } = reqState;

  return { promise: resPromise, send, isLoading, error, data, reset: setIdle };
};
