import { createContext, PropsWithChildren } from "react";
import useSession from "./hooks/useSession";
import { ApiError, UserPrivate } from "@shared/ts/api/generic";
import { UserGetSelfReq } from "@shared/ts/api/user";
import { RequestRes } from "@api/hooks/useRequest";

interface GlobalContextType {
  user?: UserPrivate;
  userIsLoading: boolean;
  userError?: ApiError<string>;
  getUser: (reqData: UserGetSelfReq) => Promise<RequestRes<UserPrivate, UserGetSelfReq>>;

  logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalContextProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  const { user, userIsLoading, userError, getUser, logout } = useSession();

  return (
    <GlobalContext.Provider value={{ user, userIsLoading, userError, getUser, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}
