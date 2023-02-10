import { useContext } from "react";
import { OrganisationsContext } from "./OrganisationsContext";

const useOrganisationsContext = () => useContext(OrganisationsContext);

export default useOrganisationsContext;
