import { api } from "@api/api";
import type { OrganisationsPumpsGetAll } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { organisationId } }: RequestInputs<OrganisationsPumpsGetAll>) => {
  const { data } = await api.get<OrganisationsPumpsGetAll["res"]>(
    `/organisations/${organisationId}/pumps`,
  );
  return data;
};
