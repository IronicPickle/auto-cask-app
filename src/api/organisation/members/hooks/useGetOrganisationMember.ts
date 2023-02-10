import useRequest from "@api/hooks/useRequest";
import getOrganisationMember from "../getOrganisationMember";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisationMember, defaultValue);
