import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { OrganisationMember } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import UpdateMemberRole from "./UpdateMemberRole";
import RemoveMember from "./RemoveMember";
import TextWrapper from "@components/common/TextWrapper";

interface Props {
  member?: OrganisationMember;
  onClose?: () => void;
}

const OrganisationMemberModal = (props: Props) => {
  const { member, onClose = () => {} } = props;

  const { user, joinedOn } = member ?? {};

  return (
    <Modal active={!!member} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.displayName} numberOfLines={1}>
              {user?.displayName}
            </Text>
          </TextWrapper>
          <Text style={styles.joinedOn}>Joined {dayjs(joinedOn).format("DD/MM/YYYY")}</Text>
        </View>
      </View>

      <UpdateMemberRole member={member} onClose={onClose} />
      <RemoveMember member={member} onClose={onClose} />
    </Modal>
  );
};

export default OrganisationMemberModal;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
    paddingRight: 64,
  },
  displayName: {
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
});
