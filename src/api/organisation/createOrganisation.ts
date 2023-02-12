import { api } from "@api/api";
import type { OrganisationCreateReq, OrganisationCreateRes } from "@shared/ts/api/organisation";

export default async ({ name }: OrganisationCreateReq) => {
  const { data } = await api.post<OrganisationCreateRes>("/organisation/create", {
    params: {
      name,
    },
  });
  return data;
};
