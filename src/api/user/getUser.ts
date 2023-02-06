import { api } from "@api/api";
import type { UserGetReq, UserGetRes } from "@shared/ts/api/user";

export default async ({ userId }: UserGetReq) => {
  const { data } = await api.get<UserGetRes>("/user/get", {
    params: { userId },
  });
  return data;
};
