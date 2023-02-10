import { colors } from "@lib/constants/colors";
import { OrganisationMember } from "@shared/ts/api/generic";
import { organisationRoleColors, organisationRoleNames } from "@constants/generic";
import dayjs from "dayjs";
import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { useOrganisationsStackNavigator } from "../OrganisationsStackNavigator";

interface Props {
  membership: OrganisationMember;
}

const OrganisationListItem = (props: Props) => {
  const { membership } = props;

  const navigator = useOrganisationsStackNavigator();

  const { organisation, role, joinedOn } = membership;

  return (
    <Pressable
      style={styles.wrapper}
      onPress={() => navigator.navigate("Organisation", { organisationId: organisation._id })}
    >
      <View style={styles.detailsWrapper}>
        <Text style={styles.organisationName}>{organisation.name}</Text>
        <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>
      </View>

      <Text style={[styles.role, { color: organisationRoleColors[role] }]}>
        {organisationRoleNames[role]}
      </Text>
    </Pressable>
  );
};

export default OrganisationListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 16,
    paddingHorizontal: 24,
  },

  detailsWrapper: {},
  organisationName: {
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
