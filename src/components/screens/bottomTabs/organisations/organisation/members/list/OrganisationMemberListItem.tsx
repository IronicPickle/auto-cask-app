import { colors } from "@lib/constants/colors";
import { OrganisationMember } from "@shared/ts/api/generic";
import { organisationRoleColors, organisationRoleNames } from "@constants/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import TextWrapper from "@components/common/TextWrapper";

interface Props {
  member: OrganisationMember;
  onPress: () => void;
}

const OrganisationMemberListItem = (props: Props) => {
  const { member, onPress } = props;

  const { user, role, joinedOn } = member;

  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <View style={styles.detailsWrapper}>
        <TextWrapper>
          <Text style={styles.displayName} numberOfLines={1}>
            {user.displayName}
          </Text>
        </TextWrapper>
        <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>
      </View>

      <Text style={[styles.role, { color: organisationRoleColors[role] }]}>
        {organisationRoleNames[role]}
      </Text>
    </Pressable>
  );
};

export default OrganisationMemberListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  detailsWrapper: {
    flex: 1,
  },
  displayName: {
    flex: 1,

    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  joinedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  role: {
    fontSize: 16,
    fontWeight: "500",
  },
});
