import DataCheck from "@components/common/DataCheck";
import { colors } from "@lib/constants/colors";
import { isEmpty } from "@shared/utils/generic";
import { Organisation, OrganisationInvite } from "@shared/ts/api/generic";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import OrganisationInviteListItem from "./OrganisationInviteListItem";
import OrganisationInviteModal from "./invite/OrganisationInviteModal";
import useGetOrganisationInvites from "@api/organisation/invites/hooks/useGetOrganisationInvites";
import IconButton from "@components/common/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import CreateInviteModal from "./CreateInviteModal";

interface Props {
  organisation: Organisation;
}

const OrganisationInviteList = (props: Props) => {
  const { organisation } = props;

  const organisationInvites = useGetOrganisationInvites([]);

  const [modalInvite, setModalInvite] = useState<OrganisationInvite | undefined>(undefined);
  const [createModalActive, setCreateModalActive] = useState(false);

  const fetch = () => organisationInvites.send({ organisationId: organisation._id });

  useEffect(() => {
    fetch();
  }, [organisation._id]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.title}>Invites</Text>

        <IconButton
          size="small"
          color="blue"
          icon={<Icon name="add" />}
          onPress={() => setCreateModalActive(true)}
        />
      </View>

      <View style={styles.listWrapper}>
        <DataCheck
          error={organisationInvites.error?.error}
          isEmpty={isEmpty(organisationInvites.data)}
          emptyMessage="No pending invites"
          retry={fetch}
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={organisationInvites.isLoading} onRefresh={fetch} />
            }
          >
            {organisationInvites.data.map(invite => (
              <OrganisationInviteListItem
                key={invite._id}
                invite={invite}
                onPress={() => {
                  setModalInvite(invite);
                }}
              />
            ))}
          </ScrollView>
        </DataCheck>
      </View>

      <OrganisationInviteModal
        invite={modalInvite}
        onClose={() => {
          setModalInvite(undefined);
          fetch();
        }}
      />

      <CreateInviteModal
        organisation={createModalActive ? organisation : undefined}
        onClose={() => {
          setCreateModalActive(false);
          fetch();
        }}
      />
    </View>
  );
};

export default OrganisationInviteList;

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
