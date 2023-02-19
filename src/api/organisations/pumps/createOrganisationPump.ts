import { api } from "@api/api";
import type { OrganisationsPumpsCreate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId },
  body,
}: RequestInputs<OrganisationsPumpsCreate>) => {
  const { data } = await api.post<OrganisationsPumpsCreate["res"]>(
    `/organisations/${organisationId}/pumps`,
    body,
  );
  return data;
};
