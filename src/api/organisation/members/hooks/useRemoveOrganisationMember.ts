import useRequest from "@api/hooks/useRequest";
import removeOrganisationMember from "../removeOrganisationMember";

export default <F = undefined>(defaultValue: F) =>
  useRequest(removeOrganisationMember, defaultValue);
