import { StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import useOrganisationsContext from "../context/useOrganisationsContext";
import OrganisationListItem from "./OrganisationListItem";

const OrganisationList = () => {
  const { memberships } = useOrganisationsContext();

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
    </ScrollView>
  );
};

export default OrganisationList;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
});
