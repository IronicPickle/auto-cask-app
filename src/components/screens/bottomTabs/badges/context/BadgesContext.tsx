import useGetBadges from "@api/badges/hooks/useGetBadges";
import { UseRequestReturn } from "@api/hooks/useRequest";
import { RequestInputs } from "@shared/ts/api/generic";
import { BadgesGetAll } from "@shared/ts/api/badges";
import { createContext, PropsWithChildren, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

interface BadgesContextType {
  badges: UseRequestReturn<RequestInputs<BadgesGetAll>, BadgesGetAll["res"]>;
}

export const BadgesContext = createContext<BadgesContextType>({} as BadgesContextType);

interface Props {}

export default function BadgesContextProvider(props: PropsWithChildren<Props>) {
  const { children } = props;

  const badges = useGetBadges([]);

  useFocusEffect(
    useCallback(() => {
      badges.send({});
    }, []),
  );

  return <BadgesContext.Provider value={{ badges }}>{children}</BadgesContext.Provider>;
}
