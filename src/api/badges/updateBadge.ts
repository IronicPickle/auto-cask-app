import { api } from "@api/api";
import type { BadgesUpdate } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ body, params: { badgeId } }: RequestInputs<BadgesUpdate>) => {
  const { data } = await api.patch<BadgesUpdate["res"]>(`/badges/${badgeId}`, body);
  return data;
};
