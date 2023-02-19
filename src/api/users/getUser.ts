import { api } from "@api/api";
import type { UserGet } from "@shared/ts/api/users";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({ params: { userId } }: RequestInputs<UserGet>) => {
  const { data } = await api.get<UserGet["res"]>(`/user/${userId}`);
  return data;
};
