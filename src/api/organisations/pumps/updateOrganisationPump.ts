import { api } from "@api/api";
import type { OrganisationsPumpsUpdate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, pumpId },
  body,
}: RequestInputs<OrganisationsPumpsUpdate>) => {
  const { data } = await api.patch<OrganisationsPumpsUpdate["res"]>(
    `/organisations/${organisationId}/pumps/${pumpId}`,
    body,
  );
  return data;
};
