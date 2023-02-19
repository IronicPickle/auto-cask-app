import { api } from "@api/api";
import type { Register } from "@shared/ts/api/auth";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({ body }: RequestInputs<Register>) => {
  const { data } = await api.post<Register["res"]>("/auth/register", body);
  return data;
};
