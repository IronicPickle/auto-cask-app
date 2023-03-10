import useRequest from "@api/hooks/useRequest";
import getOrganisationInvites from "../../invites/getOrganisationInvites";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisationInvites, defaultValue);
