import useRequest from "@api/hooks/useRequest";
import leaveOrganisation from "../leaveOrganisation";

export default <F = undefined>(defaultValue: F) => useRequest(leaveOrganisation, defaultValue);
