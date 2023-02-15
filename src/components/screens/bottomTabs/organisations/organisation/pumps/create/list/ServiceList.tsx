import DataCheck from "@components/common/DataCheck";
import useZeroconfServices from "@hooks/useZeroconfServices";
import { AutoCaskService } from "@lib/ts/generic";
import { isEmpty } from "@shared/utils/generic";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ServiceListItem from "./ServiceListItem";

interface Props {
  onFingerprint: (service: AutoCaskService) => void;
}

const ServiceList = (props: Props) => {
  const { onFingerprint } = props;

  const { services, start } = useZeroconfServices();

  useEffect(() => {
    start();
  }, []);

  return (
    <View style={styles.wrapper}>
      <DataCheck isEmpty={isEmpty(services)} emptyMessage="No pumps found">
        <ScrollView>
          {services.map(service => (
            <ServiceListItem
              key={service.name}
              service={service}
              onFingerprint={() => onFingerprint(service)}
            />
          ))}
        </ScrollView>
      </DataCheck>
    </View>
  );
};

export default ServiceList;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 100,
  },
});
