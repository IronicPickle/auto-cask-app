import { api } from "@api/api";
import type { UserGetSelf } from "@shared/ts/api/users";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({}: RequestInputs<UserGetSelf>) => {
  const { data } = await api.get<UserGetSelf["res"]>("/users/self");
  return data;
};
