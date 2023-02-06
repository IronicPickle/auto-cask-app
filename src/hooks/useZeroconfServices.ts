import { isAutoCaskService, log } from "@utils/generic";
import { AutoCaskService } from "@ts/generic";
import { useEffect, useState } from "react";
import Zeroconf from "react-native-zeroconf";
import useSendFingerprint from "@api/client/hooks/useSendFingerprint";

const zeroconf = new Zeroconf();

const useZeroconfServices = () => {
  const [services, setServices] = useState<AutoCaskService[]>([]);

  const { send: sendFingerprint, isLoading, error } = useSendFingerprint();

  useEffect(() => {
    zeroconf.on("start", () => setServices([]));
    zeroconf.on("error", err => console.log(err));
    zeroconf.on("resolved", service => {
      const serviceAlreadyResolved = !!services.find(({ txt: { mac } }) => service.txt.mac === mac);
      if (isAutoCaskService(service) && !serviceAlreadyResolved) {
        const { host, port, fullName } = service;
        log("[Zeroconf]", `Resolved service`, fullName);
        const url = `http://${host}:${port}`;
        sendFingerprint({ url, userId: "USER_ID_PLACERHOLDER" });
        setServices(services => [...services, service]);
      }
    });
    zeroconf.on("found", name => log("[Zeroconf]", `Found service ${name}`));

    zeroconf.stop();
    zeroconf.scan("http", "tcp", "local");

    return () => {
      zeroconf.removeAllListeners();
    };
  }, []);

  return services;
};

export default useZeroconfServices;
