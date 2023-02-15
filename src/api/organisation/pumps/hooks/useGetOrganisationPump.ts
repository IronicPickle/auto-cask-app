import useRequest from "@api/hooks/useRequest";
import getOrganisationPump from "../getOrganisationPump";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisationPump, defaultValue);
