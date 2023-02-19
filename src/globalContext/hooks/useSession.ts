import { SessionTokens } from "@api/api";
import useStorageItem from "@api/hooks/useStorageItem";
import useGetSelf from "@api/users/hooks/useGetSelf";
import { useEffect } from "react";

const useSession = () => {
  const self = useGetSelf(undefined);

  const { item: sessionTokens, remove } = useStorageItem<SessionTokens>("session");

  useEffect(() => {
    if (sessionTokens) self.send({});
  }, [sessionTokens]);

  const logout = async () => {
    self.reset();
    remove();
  };

  return { self, logout };
};

export default useSession;
