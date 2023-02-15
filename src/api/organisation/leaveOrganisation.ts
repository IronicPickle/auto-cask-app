import { api } from "@api/api";
import type { OrganisationLeaveReq, OrganisationLeaveRes } from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationLeaveReq) => {
  const { data } = await api.delete<OrganisationLeaveRes>("/organisation/leave", {
    params: {
      organisationId,
    },
  });
  return data;
};
