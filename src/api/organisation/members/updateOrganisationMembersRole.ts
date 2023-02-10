import { api } from "@api/api";
import type {
  OrganisationMembersRoleUpdateReq,
  OrganisationMembersRoleUpdateRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId, userId, role }: OrganisationMembersRoleUpdateReq) => {
  const { data } = await api.patch<OrganisationMembersRoleUpdateRes>(
    "/organisation/members/updateRole",
    {
      organisationId,
      userId,
      role,
    },
  );
  return data;
};
