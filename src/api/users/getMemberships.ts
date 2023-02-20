import { api } from "@api/api";
import type { UserGetMemberships } from "@shared/ts/api/users";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({}: RequestInputs<UserGetMemberships>) => {
  const { data } = await api.get<UserGetMemberships["res"]>("/users/self/memberships");
  return data;
};
