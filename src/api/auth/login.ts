import { api } from "@api/api";
import type { Login } from "@shared/ts/api/auth";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({ body }: RequestInputs<Login>) => {
  const { data } = await api.post<Login["res"]>("/auth/login", body);
  return data;
};
