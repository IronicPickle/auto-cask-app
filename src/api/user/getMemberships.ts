import { api } from "@api/api";
import type { UserGetMembershipsReq, UserGetMembershipsRes } from "@shared/ts/api/user";

export default async ({}: UserGetMembershipsReq) => {
  const { data } = await api.get<UserGetMembershipsRes>("/user/getMemberships");
  return data;
};
