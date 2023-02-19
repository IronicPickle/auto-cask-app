import useRequest from "@api/hooks/useRequest";
import createOrganisationPump from "../createOrganisationPump";

export default <F = undefined>(defaultValue: F) => useRequest(createOrganisationPump, defaultValue);
