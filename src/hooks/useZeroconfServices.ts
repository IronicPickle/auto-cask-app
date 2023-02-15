import { isAutoCaskService, log } from "@utils/generic";
import { AutoCaskService } from "@ts/generic";
import { useCallback, useEffect, useState } from "react";
import Zeroconf from "react-native-zeroconf";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";

const zeroconf = new Zeroconf();

const useZeroconfServices = () => {
  const [services, setServices] = useState<AutoCaskService[]>([]);

  const { self } = useGlobalContext();

  const start = useCallback(() => {
    zeroconf.removeAllListeners();

    zeroconf.on("start", () => setServices([]));
    zeroconf.on("error", err => console.error(err));
    zeroconf.on("resolved", service => {
      if (!self.data) return;
      const serviceAlreadyResolved = !!services.find(({ txt: { mac } }) => service.txt.mac === mac);
      if (isAutoCaskService(service) && !serviceAlreadyResolved) {
        const { name } = service;
        log("[Zeroconf]", `Resolved service`, name);
        setServices(services => {
          if (services.find(service => service.name === name)) return services;
          return [...services, service];
        });
      }
    });
    zeroconf.on("found", name => log("[Zeroconf]", `Found service ${name}`));

    zeroconf.stop();
    zeroconf.scan("http", "tcp", "local");
  }, []);

  useEffect(
    () => () => {
      zeroconf.removeAllListeners();
    },
    [],
  );

  return { services, start };
};

export default useZeroconfServices;
