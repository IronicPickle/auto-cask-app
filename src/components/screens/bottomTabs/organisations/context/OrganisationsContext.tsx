import { UseRequestReturn } from "@api/hooks/useRequest";
import useGetMemberships from "@api/users/hooks/useGetMemberships";
import { UserGetInvites, UserGetMemberships } from "@shared/ts/api/users";
import OrganisationPermissionChecker from "@shared/permissionCheckers/OrganisationPermissionChecker";
import { createContext, PropsWithChildren, useCallback } from "react";
import useGetInvites from "@api/users/hooks/useGetInvites";
import { useFocusEffect } from "@react-navigation/native";
import useGetOrganisationMembers from "@api/organisations/members/hooks/useGetOrganisationMembers";
import { OrganisationsMembersGetAll } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

interface OrganisationsContextType {
  memberships: UseRequestReturn<RequestInputs<UserGetMemberships>, UserGetMemberships["res"]>;
  invites: UseRequestReturn<RequestInputs<UserGetInvites>, UserGetInvites["res"]>;

  organisationMembers: UseRequestReturn<
    RequestInputs<OrganisationsMembersGetAll>,
    OrganisationsMembersGetAll["res"]
  >;
  permissionChecker: OrganisationPermissionChecker;
}

export const OrganisationsContext = createContext<OrganisationsContextType>(
  {} as OrganisationsContextType,
);

interface Props {}

export default function OrganisationsContextProvider(props: PropsWithChildren<Props>) {
  const { children } = props;

  const memberships = useGetMemberships([]);
  const invites = useGetInvites([]);

  useFocusEffect(
    useCallback(() => {
      memberships.send({});
      invites.send({});
    }, []),
  );

  const organisationMembers = useGetOrganisationMembers([]);

  const permissionChecker = new OrganisationPermissionChecker(organisationMembers.data);

  return (
    <OrganisationsContext.Provider
      value={{
        memberships,
        invites,

        organisationMembers,
        permissionChecker,
      }}
    >
      {children}
    </OrganisationsContext.Provider>
  );
}
