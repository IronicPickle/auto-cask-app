import useRequest from "@api/hooks/useRequest";
import updateOrganisationMembersRole from "../updateOrganisationMembersRole";

export default <F = undefined>(defaultValue: F) =>
  useRequest(updateOrganisationMembersRole, defaultValue);
