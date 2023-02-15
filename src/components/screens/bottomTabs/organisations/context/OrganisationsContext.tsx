import { UseRequestReturn } from "@api/hooks/useRequest";
import useGetMemberships from "@api/user/hooks/useGetMemberships";
import {
  UserGetInvitesReq,
  UserGetInvitesRes,
  UserGetMembershipsReq,
  UserGetMembershipsRes,
} from "@shared/ts/api/user";
import OrganisationPermissionChecker from "@shared/permissionCheckers/OrganisationPermissionChecker";
import { createContext, PropsWithChildren, useCallback } from "react";
import useGetInvites from "@api/user/hooks/useGetInvites";
import { useFocusEffect } from "@react-navigation/native";
import useGetOrganisationMembers from "@api/organisation/members/hooks/useGetOrganisationMembers";
import {
  OrganisationMembersGetAllReq,
  OrganisationMembersGetAllRes,
} from "@shared/ts/api/organisation";

interface OrganisationsContextType {
  memberships: UseRequestReturn<UserGetMembershipsReq, UserGetMembershipsRes>;
  invites: UseRequestReturn<UserGetInvitesReq, UserGetInvitesRes | undefined>;

  organisationMembers: UseRequestReturn<OrganisationMembersGetAllReq, OrganisationMembersGetAllRes>;
  permissionChecker: OrganisationPermissionChecker;
}

export const OrganisationsContext = createContext<OrganisationsContextType>(
  {} as OrganisationsContextType,
);

interface Props {}

export default function OrganisationsContextProvider(props: PropsWithChildren<Props>) {
  const { children } = props;

  const memberships = useGetMemberships([]);
  const invites = useGetInvites(undefined);

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
