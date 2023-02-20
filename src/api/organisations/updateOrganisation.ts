import { api } from "@api/api";
import type { OrganisationsUpdate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { organisationId }, body }: RequestInputs<OrganisationsUpdate>) => {
  const { data } = await api.patch<OrganisationsUpdate["res"]>(
    `/organisations/${organisationId}`,
    body,
  );
  return data;
};
