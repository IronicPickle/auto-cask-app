import { GlobalContext } from "@src/globalContext/GlobalContext";
import { useContext } from "react";

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
