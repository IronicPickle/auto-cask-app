import { api } from "@api/api";
import type { OrganisationsGet } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { organisationId } }: RequestInputs<OrganisationsGet>) => {
  const { data } = await api.get<OrganisationsGet["res"]>(`/organisations/${organisationId}`);
  return data;
};
