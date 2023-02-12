import { StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import useOrganisationsContext from "../context/useOrganisationsContext";
import OrganisationListItem from "./OrganisationListItem";
import OrganisationPromptModal from "./OrganisationPromptModal";

const OrganisationList = () => {
  const { memberships, invites } = useOrganisationsContext();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={memberships.isLoading} onRefresh={() => memberships.send({})} />
      }
      style={styles.wrapper}
    >
      {memberships.data.map(membership => (
        <OrganisationListItem key={membership._id} membership={membership} />
      ))}

      <OrganisationPromptModal
        invite={(invites.data ?? ([] as any))[0]}
        onClose={() => {
          invites.send({});
          memberships.send({});
        }}
      />
    </ScrollView>
  );
};

export default OrganisationList;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
});
