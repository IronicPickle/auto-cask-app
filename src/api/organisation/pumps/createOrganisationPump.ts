import { api } from "@api/api";
import type {
  OrganisationPumpsCreateReq,
  OrganisationPumpsCreateRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId, mac, name }: OrganisationPumpsCreateReq) => {
  const { data } = await api.post<OrganisationPumpsCreateRes>("/organisation/pumps/create", {
    organisationId,
    mac,
    name,
  });
  return data;
};
