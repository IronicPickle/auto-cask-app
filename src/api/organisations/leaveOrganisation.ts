import { api } from "@api/api";
import type { OrganisationsLeave } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { organisationId } }: RequestInputs<OrganisationsLeave>) => {
  const { data } = await api.delete<OrganisationsLeave>(`/organisations/${organisationId}/leave`);
  return data;
};
