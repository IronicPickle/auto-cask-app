import { api } from "@api/api";
import type { BadgesImageUpdate } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({
  body: { image },
  params: { badgeId },
}: RequestInputs<BadgesImageUpdate>) => {
  const body = new FormData();
  body.append("image", image);

  const { data } = await api.put<BadgesImageUpdate["res"]>(`/badges/${badgeId}/image`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
