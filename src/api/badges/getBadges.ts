import { api } from "@api/api";
import type { BadgesGetAll } from "@shared/ts/api/badges";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({}: RequestInputs<BadgesGetAll>) => {
  const { data } = await api.get<BadgesGetAll["res"]>("/badges");
  return data;
};
