import { api } from "@api/api";
import type { OrganisationsMembersGet } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  params: { organisationId, userId },
}: RequestInputs<OrganisationsMembersGet>) => {
  const { data } = await api.get<OrganisationsMembersGet["res"]>(
    `/organisations/${organisationId}/members/${userId}`,
  );
  return data;
};
