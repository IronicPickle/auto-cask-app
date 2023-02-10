import { colors } from "@lib/constants/colors";
import { organisationRoleColors, organisationRoleNames } from "@lib/constants/generic";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import dayjs from "dayjs";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import useOrganisationsContext from "../context/useOrganisationsContext";
import { OrganisationsStackParamList } from "../OrganisationsStackNavigator";
import OrganisationInviteList from "./OrganisationInviteList";
import OrganisationMemberList from "./OrganisationMemberList";

interface Props extends StackScreenProps<OrganisationsStackParamList, "Organisation"> {}

const Organisation = (props: Props) => {
  const { route } = props;

  const { self } = useGlobalContext();

  const { memberships, permissionChecker } = useOrganisationsContext();

  const { organisationId } = route.params;

  const membership = memberships.data.find(
    ({ organisation }) => organisation._id === organisationId,
  );

  useFocusEffect(
    useCallback(() => {
      memberships.send({});
    }, []),
  );

  if (!membership) return null;

  const { organisation, role, joinedOn } = membership;

  const canViewMembers = permissionChecker.canViewMembers(self.data?._id);
  const canViewInvites = permissionChecker.canViewInvites(self.data?._id);

  return (
    <View style={styles.wrapper}>
      <View style={styles.details}>
        <Text style={styles.organisationName}>{organisation?.name}</Text>
        <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>

        <Text style={[styles.role, { color: organisationRoleColors[role] }]}>
          {organisationRoleNames[role]}
        </Text>

        <Text style={styles.createdOn}>
          Formed on {dayjs(joinedOn).format("dddd DD MMMM YYYY")}
        </Text>
      </View>

      {canViewMembers && <OrganisationMemberList organisationId={organisationId} />}
      {canViewInvites && <OrganisationInviteList organisationId={organisationId} />}
    </View>
  );
};

export default Organisation;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
  },
  organisationName: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  joinedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
  role: {
    marginTop: 24,

    fontSize: 16,
    fontWeight: "500",
  },
  createdOn: {
    marginTop: 2,

    color: colors.gray,
    fontSize: 14,
    fontWeight: "400",
  },
});
