import { api } from "@api/api";
import type { OrganisationsMembersRoleUpdate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  params: { organisationId, userId },
  body,
}: RequestInputs<OrganisationsMembersRoleUpdate>) => {
  const { data } = await api.patch<OrganisationsMembersRoleUpdate["res"]>(
    `/organisations/${organisationId}/members/${userId}/role`,
    body,
  );
  return data;
};
