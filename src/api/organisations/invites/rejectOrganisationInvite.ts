import { api } from "@api/api";
import type { OrganisationsInvitesReject } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, inviteId },
}: RequestInputs<OrganisationsInvitesReject>) => {
  const { data } = await api.delete<OrganisationsInvitesReject["res"]>(
    `/organisations/${organisationId}/invites/${inviteId}/reject`,
  );
  return data;
};
