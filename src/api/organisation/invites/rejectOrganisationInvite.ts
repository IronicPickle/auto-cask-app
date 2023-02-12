import { api } from "@api/api";
import type {
  OrganisationInvitesRejectReq,
  OrganisationInvitesRejectRes,
} from "@shared/ts/api/organisation";

export default async ({ inviteId }: OrganisationInvitesRejectReq) => {
  const { data } = await api.delete<OrganisationInvitesRejectRes>("/organisation/invites/reject", {
    params: { inviteId },
  });
  return data;
};
