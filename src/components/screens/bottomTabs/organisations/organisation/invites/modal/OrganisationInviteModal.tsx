import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { OrganisationInvite } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import TextWrapper from "@components/common/TextWrapper";
import DeleteInvite from "./DeleteInvite";

interface Props {
  invite?: OrganisationInvite;
  onClose?: () => void;
}

const OrganisationInviteModal = (props: Props) => {
  const { invite, onClose = () => {} } = props;

  const { email, createdOn } = invite ?? {};

  return (
    <Modal active={!!invite} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.displayName} numberOfLines={1}>
              {email}
            </Text>
          </TextWrapper>
          <Text style={styles.invitedOn}>Invited {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
        </View>

        <DeleteInvite invite={invite} onClose={onClose} />
      </View>
    </Modal>
  );
};

export default OrganisationInviteModal;

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
  invitedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
});
