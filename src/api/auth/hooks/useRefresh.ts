import useRequest from "@api/hooks/useRequest";
import refresh from "../refresh";

export default <F = undefined>(defaultValue: F) => useRequest(refresh, defaultValue);
