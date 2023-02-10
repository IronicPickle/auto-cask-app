import useUpdateOrganisationMembersRole from "@api/organisation/members/hooks/useUpdateOrganisationMembersRole";
import Select from "@components/common/Select";
import useForm from "@hooks/useForm";
import { colors } from "@lib/constants/colors";
import { organisationSelectItems } from "@lib/constants/generic";
import { OrganisationRole } from "@shared/enums/api/generic";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import organisationValidators from "@shared/validators/organisationValidators";
import FormRow from "@components/form/FormRow";
import FormEntry from "@components/form/FormEntry";
import Button from "@components/common/Button";
import FormError from "@components/form/FormError";
import { OrganisationInvite } from "@shared/ts/api/generic";
import useOrganisationsContext from "../context/useOrganisationsContext";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Modal from "@components/common/Modal";
import { useEffect } from "react";
import useDeleteOrganisationInvite from "@api/organisation/members/hooks/useDeleteOrganisationInvite";

interface Props {
  invite?: OrganisationInvite;
  onClose?: () => void;
}

const OrganisationInviteModal = (props: Props) => {
  const { invite, onClose = () => {} } = props;

  const { user, organisation, createdOn } = invite ?? {};

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const deleteInvite = useDeleteOrganisationInvite(null);

  const canDeleteInvites = permissionChecker.canDeleteInvites(self.data?._id);

  return (
    <Modal active={!!invite} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <Text style={styles.displayName}>{user?.displayName}</Text>
          <Text style={styles.invitedOn}>Invited {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
        </View>

        <View style={styles.inviteWrapper}>
          <Button
            color="red"
            onPress={async () => {
              if (!invite) return;
              const res = await deleteInvite.send({
                inviteId: invite?._id,
              });
              if (res.error) return;
              onClose();
            }}
            disabled={!canDeleteInvites}
            isLoading={deleteInvite.isLoading}
          >
            Delete invite
          </Button>
          <FormError error={deleteInvite.error?.error} />
        </View>
      </View>
    </Modal>
  );
};

export default OrganisationInviteModal;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
  },
  displayName: {
    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  invitedOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },

  inviteWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
