import useRequest from "@api/hooks/useRequest";
import deleteOrganisationInvite from "../deleteOrganisationInvite";

export default <F = undefined>(defaultValue: F) =>
  useRequest(deleteOrganisationInvite, defaultValue);
