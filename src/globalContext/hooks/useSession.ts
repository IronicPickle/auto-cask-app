import { SessionTokens } from "@api/api";
import useStorageItem from "@api/hooks/useStorageItem";
import useGetSelf from "@api/user/hooks/useGetSelf";
import { useEffect } from "react";

const useSession = () => {
  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
    send: getSelf,
    reset,
  } = useGetSelf();

  const { item: sessionTokens, remove } = useStorageItem<SessionTokens>("session");

  useEffect(() => {
    if (sessionTokens) getSelf({});
  }, [sessionTokens]);

  const logout = async () => {
    reset();
    remove();
  };

  return { user, userIsLoading, userError, getUser: getSelf, logout };
};

export default useSession;
