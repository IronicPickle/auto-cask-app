import axios from "axios";
import type { SendFingerprintReq, SendFingerprintRes } from "@shared/ts/api/fingerprint";

export default async ({ url, userId }: SendFingerprintReq & { url: string }) => {
  const { data } = await axios.post<SendFingerprintRes>(`${url}/fingerprint`, {
    userId,
  });
  return data;
};
