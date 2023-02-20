import TextWrapper from "@components/common/TextWrapper";
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
import LeaveOrganisationButton from "./LeaveOrganisationButton";
import OrganisationInviteList from "./invites/list/OrganisationInviteList";
import OrganisationPumpList from "./pumps/list/OrganisationPumpList";
import RemoveOrganisationButton from "./RemoveOrganisationButton";
import UpdateOrganisationButton from "./UpdateOrganisationButton";
import OrganisationMemberList from "./members/list/OrganisationMemberList";
import { ScrollView } from "react-native-gesture-handler";

interface Props extends StackScreenProps<OrganisationsStackParamList, "Organisation"> {}

const Organisation = (props: Props) => {
  const { route } = props;

  const { self } = useGlobalContext();

  const { memberships, organisationMembers, permissionChecker } = useOrganisationsContext();

  const { organisationId } = route.params;

  const membership = memberships.data.find(
    ({ organisation }) => organisation._id === organisationId,
  );

  useFocusEffect(
    useCallback(() => {
      memberships.send({});
      organisationMembers.send({
        params: { organisationId },
      });
    }, []),
  );

  if (!membership) return null;

  const { organisation, role, joinedOn } = membership;

  const canViewMembers = permissionChecker.canViewMembers(self.data?._id);
  const canViewInvites = permissionChecker.canViewInvites(self.data?._id);
  const canViewPumps = permissionChecker.canViewPumps(self.data?._id);

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.details}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TextWrapper>
              <Text style={styles.organisationName} numberOfLines={1}>
                {organisation?.name}
              </Text>
            </TextWrapper>
            <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>
          </View>
          <View style={styles.headerRight}>
            <RemoveOrganisationButton organisation={organisation} />
            <LeaveOrganisationButton organisation={organisation} />
            <UpdateOrganisationButton organisation={organisation} />
          </View>
        </View>

        <Text style={[styles.role, { color: organisationRoleColors[role] }]}>
          {organisationRoleNames[role]}
        </Text>

        <Text style={styles.createdOn}>
          Formed on {dayjs(joinedOn).format("dddd DD MMMM YYYY")}
        </Text>
      </View>

      {canViewPumps && <OrganisationPumpList organisation={membership.organisation} />}
      {canViewMembers && <OrganisationMemberList organisation={membership.organisation} />}
      {canViewInvites && <OrganisationInviteList organisation={membership.organisation} />}
    </ScrollView>
  );
};

export default Organisation;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  headerLeft: {
    flex: 1,
  },
  organisationName: {
    flex: 1,

    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  joinedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },

  headerRight: {
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
