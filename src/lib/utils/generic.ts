import { AutoCaskService } from "@ts/generic";
import { Service } from "react-native-zeroconf";
import config, { isDev } from "@config/config";
import dayjs from "dayjs";
import { PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import FileViewer from "react-native-file-viewer";

export const isAutoCaskService = (service: Service): service is AutoCaskService =>
  service.name.includes("Auto Cask Client");

export const log = (...text: any[]) => {
  if (isDev) console.log("[Development]", ...text);
};

export const rgba = (rgbaString: string, alpha: number) =>
  rgbaString.replace(/(.*)([0-1])(\))$/g, `$1${alpha}$3`);

export const generateBadgeImageUrl = (_id: string) =>
  `${config.apiUrl}/images/badges/${_id}/badge.jpg?timestamp=${dayjs().toISOString()}`;

export const generateBadgeQrcodeUrl = (_id: string) =>
  `${config.apiUrl}/images/badges/${_id}/qrcode.jpg?timestamp=${dayjs().toISOString()}`;

export const downloadFile = async (url: string, fileName?: string) => {
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  if (Platform.OS === "android" && !(await hasAndroidPermission())) return;

  const fileDir = RNFetchBlob.fs.dirs.DownloadDir;
  const finalFileName = fileName ?? `image_${dayjs().unix()}`;
  const extension = (url.match(/([^.]*($|\?))/g) ?? [])[0]?.replace("?", "");

  const filePath = `${fileDir}/${finalFileName}.${extension}`;

  try {
    const { data } = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: `${filePath}`,
        description: "Image",
      },
    }).fetch("GET", url);

    FileViewer.open(data, {});

    return data;
  } catch (err) {
    log(err);
  }
};
