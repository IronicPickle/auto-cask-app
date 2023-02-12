import useRequest from "@api/hooks/useRequest";
import deleteOrganisation from "../deleteOrganisation";

export default <F = undefined>(defaultValue: F) => useRequest(deleteOrganisation, defaultValue);
