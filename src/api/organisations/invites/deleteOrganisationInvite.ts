import { api } from "@api/api";
import type { OrganisationsInvitesDelete } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, inviteId },
}: RequestInputs<OrganisationsInvitesDelete>) => {
  const { data } = await api.delete<OrganisationsInvitesDelete["res"]>(
    `/organisations/${organisationId}/invites/${inviteId}`,
  );
  return data;
};
