import { api } from "@api/api";
import type { OrganisationGetReq, OrganisationGetRes } from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationGetReq) => {
  const { data } = await api.get<OrganisationGetRes>("/organisation/get", {
    params: {
      organisationId,
    },
  });
  return data;
};
