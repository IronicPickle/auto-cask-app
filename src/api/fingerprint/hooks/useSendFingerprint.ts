import useRequest from "@api/hooks/useRequest";
import sendFingerprint from "../sendFingerprint";

export default <F = undefined>(defaultValue?: F) => useRequest(sendFingerprint, defaultValue);
