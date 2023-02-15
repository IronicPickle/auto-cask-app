import DataCheck from "@components/common/DataCheck";
import { colors } from "@lib/constants/colors";
import { isEmpty } from "@shared/utils/generic";
import { Organisation, OrganisationMember } from "@shared/ts/api/generic";
import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import OrganisationMemberListItem from "./OrganisationMemberListItem";
import useOrganisationsContext from "@screens/bottomTabs/organisations/context/useOrganisationsContext";
import OrganisationMemberModal from "../modal/OrganisationMemberModal";

interface Props {
  organisation: Organisation;
}

const OrganisationMemberList = (props: Props) => {
  const { organisation } = props;

  const { organisationMembers } = useOrganisationsContext();

  const [modalMember, setModalMember] = useState<OrganisationMember | undefined>(undefined);

  const fetch = () => organisationMembers.send({ organisationId: organisation._id });

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Members</Text>

      <View style={styles.listWrapper}>
        <DataCheck
          error={organisationMembers.error?.error}
          isEmpty={isEmpty(organisationMembers.data)}
          emptyMessage="No members found"
          retry={fetch}
        >
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={organisationMembers.isLoading} onRefresh={fetch} />
            }
          >
            {organisationMembers.data.map(member => (
              <OrganisationMemberListItem
                key={member._id}
                member={member}
                onPress={() => setModalMember(member)}
              />
            ))}
          </ScrollView>
        </DataCheck>
      </View>

      <OrganisationMemberModal
        member={modalMember}
        onClose={() => {
          setModalMember(undefined);
          fetch();
        }}
      />
    </View>
  );
};

export default OrganisationMemberList;

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,

    backgroundColor: colors.silver,
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
