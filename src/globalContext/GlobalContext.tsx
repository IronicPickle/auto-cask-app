import { UseRequestReturn } from "@api/hooks/useRequest";
import { UserGetSelfReq, UserGetSelfRes } from "@shared/ts/api/user";
import { createContext, PropsWithChildren } from "react";
import useSession from "./hooks/useSession";

interface GlobalContextType {
  self: UseRequestReturn<UserGetSelfReq, UserGetSelfRes | undefined>;

  logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalContextProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  const { self, logout } = useSession();

  return <GlobalContext.Provider value={{ self, logout }}>{children}</GlobalContext.Provider>;
}
