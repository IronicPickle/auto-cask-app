import { api } from "@api/api";
import type { OrganisationDeleteReq, OrganisationDeleteRes } from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationDeleteReq) => {
  const { data } = await api.delete<OrganisationDeleteRes>("/organisation/delete", {
    params: {
      organisationId,
    },
  });
  return data;
};
