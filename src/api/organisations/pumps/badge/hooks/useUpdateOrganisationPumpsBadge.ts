import useRequest from "@api/hooks/useRequest";
import updateOrganisationPumpBadge from "../updateOrganisationPumpBadge";

export default <F = undefined>(defaultValue: F) =>
  useRequest(updateOrganisationPumpBadge, defaultValue);
