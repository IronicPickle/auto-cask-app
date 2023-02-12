import { api } from "@api/api";
import type {
  OrganisationMembersRemoveReq,
  OrganisationMembersRemoveRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId, userId }: OrganisationMembersRemoveReq) => {
  const { data } = await api.delete<OrganisationMembersRemoveRes>("/organisation/members/remove", {
    params: {
      organisationId,
      userId,
    },
  });
  return data;
};
