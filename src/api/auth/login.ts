import { api } from "@api/api";
import type { LoginReq, LoginRes } from "@shared/ts/api/auth";

export default async ({ email, password }: LoginReq) => {
  const { data } = await api.post<LoginRes>("/auth/login", {
    email,
    password,
  });
  return data;
};
