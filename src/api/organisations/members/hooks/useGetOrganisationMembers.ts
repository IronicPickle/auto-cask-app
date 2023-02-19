import useRequest from "@api/hooks/useRequest";
import getOrganisationMembers from "../getOrganisationMembers";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisationMembers, defaultValue);
