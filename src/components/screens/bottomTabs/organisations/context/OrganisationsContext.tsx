import { UseRequestReturn } from "@api/hooks/useRequest";
import useGetMemberships from "@api/user/hooks/useGetMemberships";
import { UserGetMembershipsReq, UserGetMembershipsRes } from "@shared/ts/api/user";
import OrganisationPermissionChecker from "@shared/permissionCheckers/OrganisationPermissionChecker";
import { createContext, PropsWithChildren, useEffect } from "react";

interface OrganisationsContextType {
  memberships: UseRequestReturn<UserGetMembershipsReq, UserGetMembershipsRes>;
  permissionChecker: OrganisationPermissionChecker;
}

export const OrganisationsContext = createContext<OrganisationsContextType>(
  {} as OrganisationsContextType,
);

interface Props {}

export default function OrganisationsContextProvider(props: PropsWithChildren<Props>) {
  const { children } = props;

  const memberships = useGetMemberships<UserGetMembershipsRes>([]);

  useEffect(() => {
    memberships.send({});
  }, []);

  const permissionChecker = new OrganisationPermissionChecker(memberships.data);

  return (
    <OrganisationsContext.Provider
      value={{
        memberships,
        permissionChecker,
      }}
    >
      {children}
    </OrganisationsContext.Provider>
  );
}
