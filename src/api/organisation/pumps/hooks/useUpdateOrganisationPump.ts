import useRequest from "@api/hooks/useRequest";
import updateOrganisationPump from "../updateOrganisationPump";

export default <F = undefined>(defaultValue: F) => useRequest(updateOrganisationPump, defaultValue);
