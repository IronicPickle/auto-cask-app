import { api } from "@api/api";
import type { OrganisationUpdateReq, OrganisationUpdateRes } from "@shared/ts/api/organisation";

export default async ({ organisationId, name }: OrganisationUpdateReq) => {
  const { data } = await api.patch<OrganisationUpdateRes>("/organisation/update", {
    organisationId,
    name,
  });
  return data;
};
