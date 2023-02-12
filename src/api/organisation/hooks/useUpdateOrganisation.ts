import useRequest from "@api/hooks/useRequest";
import updateOrganisation from "../updateOrganisation";

export default <F = undefined>(defaultValue: F) => useRequest(updateOrganisation, defaultValue);
