import useRequest from "@api/hooks/useRequest";
import getOrganisationPumps from "../getOrganisationPumps";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisationPumps, defaultValue);
