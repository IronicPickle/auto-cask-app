import type { ApiError } from "@shared/ts/api/generic";
import { useState } from "react";

export type CurrentReqState<D, R> = {
  isLoading: boolean;
  data?: R;
  error?: ApiError<keyof D>;
};

const useRequestState = <D, R>(defaultData?: R) => {
  const createReqState = (
    isLoading: boolean,
    data?: R,
    error?: ApiError<keyof D>,
  ): CurrentReqState<D, R> => ({
    isLoading,
    data,
    error,
  });

  const [reqState, setReqState] = useState<CurrentReqState<D, R>>(
    createReqState(false, defaultData),
  );

  const setIdle = () => {
    const newReqState = createReqState(false, defaultData);
    setReqState(newReqState);
    return newReqState;
  };
  const setLoading = () => {
    const newReqState = createReqState(true, defaultData);
    setReqState(newReqState);
    return newReqState;
  };
  const setSuccess = (data: R) => {
    const newReqState = createReqState(false, data);
    setReqState(newReqState);
    return newReqState;
  };
  const setError = (error: ApiError<keyof D>) => {
    const newReqState = createReqState(false, defaultData, error);
    setReqState(newReqState);
    return newReqState;
  };

  return { reqState, setIdle, setLoading, setSuccess, setError };
};

export default useRequestState;
