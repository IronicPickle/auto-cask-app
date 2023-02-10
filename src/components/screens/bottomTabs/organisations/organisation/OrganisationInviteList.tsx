import useGetOrganisationInvites from "@api/organisation/members/hooks/useGetOrganisationInvites";
import DataCheck from "@components/common/DataCheck";
import { colors } from "@lib/constants/colors";
import { isEmpty } from "@shared/utils/generic";
import { OrganisationInvite } from "@shared/ts/api/generic";
import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import OrganisationInviteListItem from "./OrganisationInviteListItem";
import OrganisationInviteModal from "./OrganisationInviteModal";

interface Props {
  organisationId: string;
}

const OrganisationInviteList = (props: Props) => {
  const { organisationId } = props;
  const organisationInvites = useGetOrganisationInvites([]);

  const [modalInvite, setModalInvite] = useState<OrganisationInvite | undefined>(undefined);

  const fetch = () => organisationInvites.send({ organisationId });

  useEffect(() => {
    fetch();
  }, [organisationId]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Invites</Text>

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

  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "600",
  },
});
