import { api } from "@api/api";
import type {
  OrganisationInvitesGetAllReq,
  OrganisationInvitesGetAllRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationInvitesGetAllReq) => {
  const { data } = await api.get<OrganisationInvitesGetAllRes>("/organisation/invites/getAll", {
    params: {
      organisationId,
    },
  });
  return data;
};
