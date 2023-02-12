import useRequest from "@api/hooks/useRequest";
import acceptOrganisationInvite from "../acceptOrganisationInvite";

export default <F = undefined>(defaultValue: F) =>
  useRequest(acceptOrganisationInvite, defaultValue);
