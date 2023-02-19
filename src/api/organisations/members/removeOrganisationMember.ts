import { api } from "@api/api";
import type { OrganisationsMembersRemove } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({
  params: { organisationId, userId },
}: RequestInputs<OrganisationsMembersRemove>) => {
  const { data } = await api.delete<OrganisationsMembersRemove["res"]>(
    `/organisations/${organisationId}/members/${userId}/remove`,
  );
  return data;
};
