import { api } from "@api/api";
import type { UserGetInvites } from "@shared/ts/api/users";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({}: RequestInputs<UserGetInvites>) => {
  const { data } = await api.get<UserGetInvites["res"]>("/users/self/invites");
  return data;
};
