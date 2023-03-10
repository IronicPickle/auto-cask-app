import useDeleteOrganisationInvite from "@api/organisations/invites/hooks/useDeleteOrganisationInvite";
import useRemoveOrganisationMember from "@api/organisations/members/hooks/useRemoveOrganisationMember";
import Button from "@components/common/Button";
import FormError from "@components/form/FormError";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { colors } from "@lib/constants/colors";
import useOrganisationsContext from "@screens/bottomTabs/organisations/context/useOrganisationsContext";
import { OrganisationMember } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import { StyleSheet, View } from "react-native";

interface Props {
  member?: OrganisationMember;
  onClose?: () => void;
}

const RemoveMember = (props: Props) => {
  const { member, onClose = () => {} } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const { organisation, user } = member ?? {};

  const removeMember = useRemoveOrganisationMember(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!organisation || !user) return;
    const res = await removeMember.send({
      params: {
        organisationId: organisation._id,
        userId: user._id,
      },
    });
    if (res.error) return;
    onClose();
  });

  const canRemoveMember = permissionChecker.canRemoveMember(self.data?._id, user?._id);

  return (
    <View style={styles.wrapper}>
      <Button
        color="red"
        onPress={openDialog}
        disabled={!canRemoveMember}
        isLoading={removeMember.isLoading}
      >
        Remove member
      </Button>
      <FormError error={removeMember.error?.error} />

      <DialogModal active={dialogActive} onClose={closeDialog} onConfirm={confirmDialog} />
    </View>
  );
};

export default RemoveMember;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
