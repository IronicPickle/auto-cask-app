import { api } from "@api/api";
import type {
  OrganisationInvitesDeleteReq,
  OrganisationInvitesDeleteRes,
} from "@shared/ts/api/organisation";

export default async ({ inviteId }: OrganisationInvitesDeleteReq) => {
  const { data } = await api.delete<OrganisationInvitesDeleteRes>("/organisation/invites/delete", {
    params: { inviteId },
  });
  return data;
};
