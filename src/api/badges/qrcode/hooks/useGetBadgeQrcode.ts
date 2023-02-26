import useRequest from "@api/hooks/useRequest";
import getBadgeQrcode from "../getBadgeQrcode";

export default <F = undefined>(defaultValue: F) => useRequest(getBadgeQrcode, defaultValue);
