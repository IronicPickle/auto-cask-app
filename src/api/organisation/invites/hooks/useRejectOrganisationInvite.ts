import useRequest from "@api/hooks/useRequest";
import rejectOrganisationInvite from "../rejectOrganisationInvite";

export default <F = undefined>(defaultValue: F) =>
  useRequest(rejectOrganisationInvite, defaultValue);
