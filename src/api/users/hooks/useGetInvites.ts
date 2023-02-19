import useRequest from "@api/hooks/useRequest";
import getInvites from "../getInvites";

export default <F = undefined>(defaultValue: F) => useRequest(getInvites, defaultValue);
