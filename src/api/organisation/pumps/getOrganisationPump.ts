import { api } from "@api/api";
import type { OrganisationPumpsGetReq, OrganisationPumpsGetRes } from "@shared/ts/api/organisation";

export default async ({ pumpId }: OrganisationPumpsGetReq) => {
  const { data } = await api.get<OrganisationPumpsGetRes>("/organisation/pumps/get", {
    params: { pumpId },
  });
  return data;
};
