import useRequest from "@api/hooks/useRequest";
import getSelf from "../getSelf";

export default <F = undefined>(defaultValue?: F) => useRequest(getSelf, defaultValue);
