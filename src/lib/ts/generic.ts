import { colors } from "@lib/constants/colors";
import { Service } from "react-native-zeroconf";

export interface AutoCaskService extends Service {
  txt: {
    mac: string;
  };
}

export type UIColor = keyof typeof colors;
