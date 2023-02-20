import { api } from "@api/api";
import type { OrganisationsPumpsBadgeUpdate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  params: { organisationId, pumpId },
  body,
}: RequestInputs<OrganisationsPumpsBadgeUpdate>) => {
  const { data } = await api.patch<OrganisationsPumpsBadgeUpdate["res"]>(
    `/organisations/${organisationId}/pumps/${pumpId}/badge`,
    body,
  );
  return data;
};
