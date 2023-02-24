import useRequest from "@api/hooks/useRequest";
import updateBadgeImage from "../updateBadgeImage";

export default <F = undefined>(defaultValue: F) => useRequest(updateBadgeImage, defaultValue);
