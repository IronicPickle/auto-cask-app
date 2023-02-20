import useRequest from "@api/hooks/useRequest";
import getBadge from "../getBadge";

export default <F = undefined>(defaultValue: F) => useRequest(getBadge, defaultValue);
