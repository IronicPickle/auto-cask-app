import { downloadFile, generateBadgeQrcodeUrl } from "@lib/utils/generic";
import type { BadgesQrcodeGet } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ params: { badgeId, fileName } }: RequestInputs<BadgesQrcodeGet>) => {
  const { data } = await downloadFile(generateBadgeQrcodeUrl(badgeId), fileName);
  return data;
};
