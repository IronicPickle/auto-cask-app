import useRequest from "@api/hooks/useRequest";
import deleteOrganisationPump from "../deleteOrganisationPump";

export default <F = undefined>(defaultValue: F) => useRequest(deleteOrganisationPump, defaultValue);
