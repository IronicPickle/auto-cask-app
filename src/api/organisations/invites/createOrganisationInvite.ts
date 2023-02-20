import { api } from "@api/api";
import type { OrganisationsInvitesCreate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  params: { organisationId },
  body,
}: RequestInputs<OrganisationsInvitesCreate>) => {
  const { data } = await api.post<OrganisationsInvitesCreate["res"]>(
    `/organisations/${organisationId}/invites`,
    body,
  );
  return data;
};
