import useRequest from "@api/hooks/useRequest";
import getOrganisation from "../getOrganisation";

export default <F = undefined>(defaultValue: F) => useRequest(getOrganisation, defaultValue);
