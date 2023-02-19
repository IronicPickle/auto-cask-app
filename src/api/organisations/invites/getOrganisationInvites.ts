import { api } from "@api/api";
import type { OrganisationsInvitesGetAll } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId },
}: RequestInputs<OrganisationsInvitesGetAll>) => {
  const { data } = await api.get<OrganisationsInvitesGetAll["res"]>(
    `/organisations/${organisationId}/invites`,
  );
  return data;
};
