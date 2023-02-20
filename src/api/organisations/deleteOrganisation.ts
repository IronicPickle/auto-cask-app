import { api } from "@api/api";
import type { OrganisationsDelete } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { organisationId } }: RequestInputs<OrganisationsDelete>) => {
  const { data } = await api.delete<OrganisationsDelete["res"]>(`/organisations/${organisationId}`);
  return data;
};
