import useRequest from "@api/hooks/useRequest";
import createOrganisation from "../createOrganisation";

export default <F = undefined>(defaultValue: F) => useRequest(createOrganisation, defaultValue);
