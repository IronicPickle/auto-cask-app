import useRequest from "@api/hooks/useRequest";
import getUser from "../getUser";

export default <F = undefined>(defaultValue: F) => useRequest(getUser, defaultValue);
