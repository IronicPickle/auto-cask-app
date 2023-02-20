import useRequest from "@api/hooks/useRequest";
import getBadges from "../getBadges";

export default <F = undefined>(defaultValue: F) => useRequest(getBadges, defaultValue);
