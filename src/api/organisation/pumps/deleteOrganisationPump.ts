import { api } from "@api/api";
import type {
  OrganisationPumpsDeleteReq,
  OrganisationPumpsDeleteRes,
} from "@shared/ts/api/organisation";

export default async ({ pumpId }: OrganisationPumpsDeleteReq) => {
  const { data } = await api.delete<OrganisationPumpsDeleteRes>("/organisation/pumps/delete", {
    params: { pumpId },
  });
  return data;
};
