import useRequest from "@api/hooks/useRequest";
import updateBadge from "../updateBadge";

export default <F = undefined>(defaultValue: F) => useRequest(updateBadge, defaultValue);
