import { api } from "@api/api";
import type { OrganisationsPumpsDelete } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, pumpId },
}: RequestInputs<OrganisationsPumpsDelete>) => {
  const { data } = await api.delete<OrganisationsPumpsDelete["res"]>(
    `/organisations/${organisationId}/pumps/${pumpId}`,
  );
  return data;
};
