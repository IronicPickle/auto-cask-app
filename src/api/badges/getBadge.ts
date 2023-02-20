import { api } from "@api/api";
import type { BadgesGet } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { badgeId } }: RequestInputs<BadgesGet>) => {
  const { data } = await api.get<BadgesGet["res"]>(`/badges/${badgeId}`);
  return data;
};
