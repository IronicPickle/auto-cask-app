import { api } from "@api/api";
import type { UserGetInvitesRes, UserGetInvitesReq } from "@shared/ts/api/user";

export default async ({}: UserGetInvitesReq) => {
  const { data } = await api.get<UserGetInvitesRes>("/user/getInvites");
  return data;
};
