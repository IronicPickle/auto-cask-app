import axios from "axios";
import type { CreateFingerprint } from "@shared/ts/api/fingerprint";
import { RequestInputs } from "@shared/ts/api/generic";

export default async ({ url, body }: RequestInputs<CreateFingerprint> & { url: string }) => {
  const { data } = await axios.post<CreateFingerprint["res"]>(`${url}/fingerprint`, body);
  return data;
};
