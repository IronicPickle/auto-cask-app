import { colors } from "@lib/constants/colors";
import { OrganisationInvite } from "@shared/ts/api/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";

interface Props {
  invite: OrganisationInvite;
  onPress: () => void;
}

const OrganisationInviteListItem = (props: Props) => {
  const { invite, onPress } = props;

  const { user, createdOn } = invite;

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.detailsWrapper}>
        <Text style={styles.displayName}>{user.displayName}</Text>
        <Text style={styles.createdOn}>Joined {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
      </View>

      <Text style={styles.status}>Pending</Text>
    </Pressable>
  );
};

export default OrganisationInviteListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  detailsWrapper: {},
  displayName: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  createdOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  status: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.orange,
  },
});
