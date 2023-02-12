import useRequest from "@api/hooks/useRequest";
import createOrganisationInvite from "../createOrganisationInvite";

export default <F = undefined>(defaultValue: F) =>
  useRequest(createOrganisationInvite, defaultValue);
