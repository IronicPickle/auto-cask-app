import { api } from "@api/api";
import type { OrganisationsCreate } from "@shared/ts/api/organisations";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({ body }: RequestInputs<OrganisationsCreate>) => {
  const { data } = await api.post<OrganisationsCreate["res"]>("/organisations", body);
  return data;
};
