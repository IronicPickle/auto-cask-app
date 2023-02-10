import useRequest from "@api/hooks/useRequest";
import login from "../login";

export default <F = undefined>(defaultValue: F) => useRequest(login, defaultValue);
