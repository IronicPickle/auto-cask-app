import { api } from "@api/api";
import type { Refresh } from "@shared/ts/api/auth";
import { RequestInputs } from "@src/../../auto-cask-shared/ts/api/generic";

export default async ({ body }: RequestInputs<Refresh>) => {
  const { data } = await api.post<Refresh["res"]>("/auth/refresh", body);
  return data;
};
