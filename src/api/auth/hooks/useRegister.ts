import useRequest from "@api/hooks/useRequest";
import register from "../register";

export default <F = undefined>(defaultValue?: F) => useRequest(register, defaultValue);
