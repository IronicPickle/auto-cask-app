import { colors } from "@lib/constants/colors";
import { Organisation, OrganisationPump } from "@shared/ts/api/generic";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import IconButton from "@components/common/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import useOrganisationsContext from "../../../context/useOrganisationsContext";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import CreatePumpModal from "../create/CreatePumpModal";
import useGetOrganisationPumps from "@api/organisation/pumps/hooks/useGetOrganisationPumps";
import DataCheck from "@components/common/DataCheck";
import OrganisationPumpListItem from "./OrganisationPumpListItem";
import { isEmpty } from "@shared/utils/generic";
import OrganisationPumpModal from "../modal/OrganisationPumpModal";

interface Props {
  organisation: Organisation;
}

const OrganisationPumpList = (props: Props) => {
  const { organisation } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const organisationPumps = useGetOrganisationPumps([]);

  const [modalPump, setModalPump] = useState<OrganisationPump | undefined>(undefined);
  const [createModalActive, setCreateModalActive] = useState(false);

  const fetch = () => organisationPumps.send({ organisationId: organisation._id });

  useEffect(() => {
    fetch();
  }, [organisation._id]);

  const canCreatePumps = permissionChecker.canCreatePumps(self.data?._id);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Pumps</Text>

        {canCreatePumps && (
          <IconButton
            size="small"
            color="blue"
            icon={<Icon name="add" />}
            onPress={() => setCreateModalActive(true)}
          />
        )}
      </View>

      <View style={styles.listWrapper}>
        <DataCheck
          error={organisationPumps.error?.error}
          isEmpty={isEmpty(organisationPumps.data)}
          emptyMessage="No pumps setup"
          retry={fetch}
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={organisationPumps.isLoading} onRefresh={fetch} />
            }
          >
            {organisationPumps.data.map(pump => (
              <OrganisationPumpListItem
                key={pump._id}
                pump={pump}
                onPress={() => {
                  setModalPump(pump);
                }}
              />
            ))}
          </ScrollView>
        </DataCheck>
      </View>

      <OrganisationPumpModal
        pump={modalPump}
        onClose={() => {
          setModalPump(undefined);
          fetch();
        }}
      />

      <CreatePumpModal
        organisation={createModalActive ? organisation : undefined}
        onClose={() => {
          setCreateModalActive(false);
          fetch();
        }}
      />
    </View>
  );
};

export default OrganisationPumpList;

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
  },

  listWrapper: {
    position: "relative",
    minHeight: 100,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
  },
});
