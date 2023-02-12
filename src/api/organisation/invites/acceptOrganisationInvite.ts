import { api } from "@api/api";
import type {
  OrganisationInvitesAcceptReq,
  OrganisationInvitesAcceptRes,
} from "@shared/ts/api/organisation";

export default async ({ inviteId }: OrganisationInvitesAcceptReq) => {
  const { data } = await api.post<OrganisationInvitesAcceptRes>("/organisation/invites/accept", {
    inviteId,
  });
  return data;
};
