import { api } from "@api/api";
import type {
  OrganisationMembersGetReq,
  OrganisationMembersGetRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId, userId }: OrganisationMembersGetReq) => {
  const { data } = await api.get<OrganisationMembersGetRes>("/organisation/members/get", {
    params: {
      organisationId,
      userId,
    },
  });
  return data;
};
