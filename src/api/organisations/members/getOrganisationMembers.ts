import { api } from "@api/api";
import type { OrganisationsMembersGetAll } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  params: { organisationId },
}: RequestInputs<OrganisationsMembersGetAll>) => {
  const { data } = await api.get<OrganisationsMembersGetAll["res"]>(
    `/organisations/${organisationId}/members`,
  );
  return data;
};
