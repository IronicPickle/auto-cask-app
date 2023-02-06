import { api } from "@api/api";
import type { RegisterReq, RegisterRes } from "@shared/ts/api/auth";

export default async ({ email, password, displayName }: RegisterReq) => {
  const { data } = await api.post<RegisterRes>("/auth/register", {
    email,
    password,
    displayName,
  });
  return data;
};
