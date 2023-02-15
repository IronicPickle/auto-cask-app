import { api } from "@api/api";
import type {
  OrganisationPumpsGetAllReq,
  OrganisationPumpsGetAllRes,
} from "@shared/ts/api/organisation";

export default async ({ organisationId }: OrganisationPumpsGetAllReq) => {
  const { data } = await api.get<OrganisationPumpsGetAllRes>("/organisation/pumps/getAll", {
    params: { organisationId },
  });
  return data;
};
