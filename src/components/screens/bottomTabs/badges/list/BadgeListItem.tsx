import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useBadgesStackNavigator } from "../BadgesStackNavigator";
import TextWrapper from "@components/common/TextWrapper";
import { Badge } from "@shared/ts/api/generic";

interface Props {
  badge: Badge;
}

const BadgeListItem = (props: Props) => {
  const { badge } = props;

  const navigator = useBadgesStackNavigator();

  const { name, breweryName, createdBy, createdOn } = badge;

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => navigator.navigate("Badge", { badgeId: badge._id })}
    >
      <View style={styles.detailsWrapper}>
        <TextWrapper>
          <Text style={styles.organisationName} numberOfLines={1}>
            {name}
          </Text>
        </TextWrapper>
        <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
      </View>

      <Text style={styles.creator}>{createdBy.displayName}</Text>
    </Pressable>
  );
};

export default BadgeListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  detailsWrapper: {
    flex: 1,
  },
  organisationName: {
    flex: 1,

    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  createdOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  creator: {
    fontSize: 16,
    fontWeight: "500",
  },
});
