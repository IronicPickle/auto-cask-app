import { colors } from "@lib/constants/colors";
import { OrganisationMember } from "@shared/ts/api/generic";
import { organisationRoleColors, organisationRoleNames } from "@constants/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import TextWrapper from "@components/common/TextWrapper";

interface Props {
  membership: OrganisationMember;
  onSelect: () => void;
}

const OrganisationSelectListItem = (props: Props) => {
  const { membership, onSelect } = props;

  const { organisation, role, joinedOn } = membership;

  return (
    <Pressable style={styles.wrapper} onPress={onSelect}>
      <View style={styles.detailsWrapper}>
        <TextWrapper>
          <Text style={styles.organisationName} numberOfLines={1}>
            {organisation.name}
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

export default OrganisationSelectListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    backgroundColor: colors.silver,

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
