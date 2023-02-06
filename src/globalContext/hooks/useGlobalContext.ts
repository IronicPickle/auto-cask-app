import { GlobalContext } from "@src/globalContext/GlobalContextProvider";
import { useContext } from "react";

const useGlobalContext = () => useContext(GlobalContext);

export default useGlobalContext;
