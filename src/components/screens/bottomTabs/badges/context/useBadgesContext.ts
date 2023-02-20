import { useContext } from "react";
import { BadgesContext } from "./BadgesContext";

const useBadgesContext = () => useContext(BadgesContext);

export default useBadgesContext;
