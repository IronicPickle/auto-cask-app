import { AutoCaskService } from "@ts/generic";
import { Service } from "react-native-zeroconf";
import config, { isDev } from "@config/config";
import dayjs from "dayjs";

export const isAutoCaskService = (service: Service): service is AutoCaskService =>
  service.name.includes("Auto Cask Client");

export const log = (...text: any[]) => {
  if (isDev) console.log("[Development]", ...text);
};

export const rgba = (rgbaString: string, alpha: number) =>
  rgbaString.replace(/(.*)([0-1])(\))$/g, `$1${alpha}$3`);

export const generateBadgeImageUrl = (_id: string) =>
  `${config.apiUrl}/images/badges/${_id}.jpg?timestamp=${dayjs().toISOString()}`;
