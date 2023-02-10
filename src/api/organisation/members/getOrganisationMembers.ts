import { api } from "@api/api";
import type {
  OrganisationMembersGetAllReq,
  OrganisationMembersGetAllRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationMembersGetAllReq) => {
  const { data } = await api.get<OrganisationMembersGetAllRes>("/organisation/members/getAll", {
    params: {
      organisationId,
    },
  });
  return data;
};
