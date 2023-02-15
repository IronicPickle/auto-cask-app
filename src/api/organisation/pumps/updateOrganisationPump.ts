import { api } from "@api/api";
import type {
  OrganisationPumpsUpdateReq,
  OrganisationPumpsUpdateRes,
} from "@shared/ts/api/organisation";

export default async ({ pumpId, name }: OrganisationPumpsUpdateReq) => {
  const { data } = await api.patch<OrganisationPumpsUpdateRes>("/organisation/pumps/update", {
    pumpId,
    name,
  });
  return data;
};
