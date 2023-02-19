import { api } from "@api/api";
import type { OrganisationsInvitesAccept } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, inviteId },
}: RequestInputs<OrganisationsInvitesAccept>) => {
  const { data } = await api.post<OrganisationsInvitesAccept["res"]>(
    `/organisations/${organisationId}/invites/${inviteId}/accept`,
  );
  return data;
};
