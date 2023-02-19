import useRequest from "@api/hooks/useRequest";
import createFingerprint from "../createFingerprint";

export default <F = undefined>(defaultValue: F) => useRequest(createFingerprint, defaultValue);
