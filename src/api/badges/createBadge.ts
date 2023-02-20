import { api } from "@api/api";
import type { BadgesCreate } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ body }: RequestInputs<BadgesCreate>) => {
  const { data } = await api.put<BadgesCreate["res"]>("/badges", body);
  return data;
};
