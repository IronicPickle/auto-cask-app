import useDeleteOrganisationInvite from "@api/organisation/invites/hooks/useDeleteOrganisationInvite";
import Button from "@components/common/Button";
import FormError from "@components/form/FormError";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { colors } from "@lib/constants/colors";
import { OrganisationInvite } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import { StyleSheet, View } from "react-native";
import useOrganisationsContext from "../../../context/useOrganisationsContext";

interface Props {
  invite?: OrganisationInvite;
  onClose?: () => void;
}

const DeleteInvite = (props: Props) => {
  const { invite, onClose = () => {} } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const deleteInvite = useDeleteOrganisationInvite(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!invite) return;
    const res = await deleteInvite.send({
      inviteId: invite?._id,
    });
    if (res.error) return;
    onClose();
  });

  const canDeleteInvites = permissionChecker.canDeleteInvites(self.data?._id);

  return (
    <View style={styles.wrapper}>
      <Button
        color="red"
        onPress={openDialog}
        disabled={!canDeleteInvites}
        isLoading={deleteInvite.isLoading}
      >
        Delete invite
      </Button>
      <FormError error={deleteInvite.error?.error} />

      <DialogModal active={dialogActive} onClose={closeDialog} onConfirm={confirmDialog} />
    </View>
  );
};

export default DeleteInvite;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
