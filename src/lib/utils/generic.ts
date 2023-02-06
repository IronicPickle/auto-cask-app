import { AutoCaskService } from "@ts/generic";
import { Service } from "react-native-zeroconf";
import { isDev } from "@config/config";

export const isAutoCaskService = (service: Service): service is AutoCaskService =>
  service.name === "Auto Cask Client";

export const log = (...text: any[]) => {
  if (isDev) console.log("[Development]", ...text);
};
