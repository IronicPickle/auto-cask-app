import { SessionTokens } from "@api/api";
import { UseRequestReturn } from "@api/hooks/useRequest";
import { RequestInputs } from "@shared/ts/api/generic";
import { UserGetSelf } from "@shared/ts/api/users";
import { createContext, PropsWithChildren } from "react";
import useSession from "./hooks/useSession";

interface GlobalContextType {
  self: UseRequestReturn<RequestInputs<UserGetSelf>, UserGetSelf["res"] | undefined>;
  sessionTokens: SessionTokens | null;

  logout: () => void;
}

export const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

export default function GlobalContextProvider(props: PropsWithChildren<{}>) {
  const { children } = props;

  const { self, sessionTokens, logout } = useSession();

  return (
    <GlobalContext.Provider value={{ self, sessionTokens, logout }}>
      {children}
    </GlobalContext.Provider>
  );
}
