import useRequest from "@api/hooks/useRequest";
import createBadge from "../createBadge";

export default <F = undefined>(defaultValue: F) => useRequest(createBadge, defaultValue);
