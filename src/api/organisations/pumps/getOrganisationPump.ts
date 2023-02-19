import { api } from "@api/api";
import type { OrganisationsPumpsGet } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, pumpId },
}: RequestInputs<OrganisationsPumpsGet>) => {
  const { data } = await api.get<OrganisationsPumpsGet["res"]>(
    `/organisations/${organisationId}/pumps/${pumpId}`,
  );
  return data;
};
