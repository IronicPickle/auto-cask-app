import { api } from "@api/api";
import type {
  OrganisationInvitesCreateReq,
  OrganisationInvitesCreateRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId, email }: OrganisationInvitesCreateReq) => {
  const { data } = await api.post<OrganisationInvitesCreateRes>("/organisation/invites/create", {
    organisationId,
    email,
  });
  return data;
};
