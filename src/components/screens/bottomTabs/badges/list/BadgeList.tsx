import { StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import useBadgesContext from "../context/useBadgesContext";
import CreateBadgeButton from "./create/CreateBadgeButton";
import BadgeListItem from "./BadgeListItem";

const BadgeList = () => {
  const { badges } = useBadgesContext();

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={badges.isLoading} onRefresh={() => badges.send({})} />
        }
        style={styles.wrapper}
      >
        {badges.data.map(badge => (
          <BadgeListItem key={badge._id} badge={badge} />
        ))}
      </ScrollView>
      <CreateBadgeButton />
    </>
  );
};

export default BadgeList;

const styles = StyleSheet.create({
  wrapper: {
    height: "100%",
  },
});
