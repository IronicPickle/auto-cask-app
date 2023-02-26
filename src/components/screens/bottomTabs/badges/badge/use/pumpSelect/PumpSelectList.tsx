import useGetOrganisationPumps from "@api/organisations/pumps/hooks/useGetOrganisationPumps";
import DataCheck from "@components/common/DataCheck";
import { isEmpty } from "@shared/utils/generic";
import { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import PumpSelectListItem from "./PumpSelectListItem";

interface Props {
  organisationId: string;
  onSelect: (pumpId: string) => void;
}

const PumpSelectList = (props: Props) => {
  const { organisationId, onSelect } = props;

  const pumps = useGetOrganisationPumps([]);

  useEffect(() => {
    pumps.send({
      params: {
        organisationId,
      },
    });
  }, []);

  useEffect(() => {
    if (pumps.data.length === 1) onSelect(pumps.data[0]._id);
  }, [pumps.data]);

  if (pumps.data.length === 1) return null;

  return (
    <View style={styles.wrapper}>
      <DataCheck
        error={pumps.error?.error}
        isEmpty={isEmpty(pumps.data)}
        emptyMessage="There are no pumps in this organisation"
      >
        <ScrollView>
          {pumps.data.map(pump => (
            <PumpSelectListItem key={pump._id} pump={pump} onSelect={() => onSelect(pump._id)} />
          ))}
        </ScrollView>
      </DataCheck>
    </View>
  );
};

export default PumpSelectList;

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 100,
  },
});
