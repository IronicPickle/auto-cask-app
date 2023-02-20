import useRequest from "@api/hooks/useRequest";
import deleteBadge from "../deleteBadge";

export default <F = undefined>(defaultValue: F) => useRequest(deleteBadge, defaultValue);
