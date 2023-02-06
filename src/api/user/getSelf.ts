import { api } from "@api/api";
import type { UserGetSelfReq, UserGetSelfRes } from "@shared/ts/api/user";

export default async ({}: UserGetSelfReq) => {
  const { data } = await api.get<UserGetSelfRes>("/user/getSelf");
  return data;
};
