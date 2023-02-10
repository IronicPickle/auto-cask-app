import useRequest from "@api/hooks/useRequest";
import getMemberships from "../getMemberships";

export default <F = undefined>(defaultValue: F) => useRequest(getMemberships, defaultValue);
