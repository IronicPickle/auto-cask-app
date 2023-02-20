import { api } from "@api/api";
import type { BadgesDelete } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { badgeId } }: RequestInputs<BadgesDelete>) => {
  const { data } = await api.delete<BadgesDelete["res"]>(`/badges/${badgeId}`);
  return data;
};
