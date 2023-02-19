import useDeleteOrganisationPump from "@api/organisations/pumps/hooks/useDeleteOrganisationPump";
import Button from "@components/common/Button";
import FormError from "@components/form/FormError";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { colors } from "@lib/constants/colors";
import useOrganisationsContext from "@screens/bottomTabs/organisations/context/useOrganisationsContext";
import { Organisation, OrganisationPump } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import { StyleSheet, View } from "react-native";

interface Props {
  pump?: OrganisationPump;
  onClose?: () => void;
}

const RemovePump = (props: Props) => {
  const { pump, onClose = () => {} } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const deletePump = useDeleteOrganisationPump(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!pump) return;
    const res = await deletePump.send({
      params: {
        organisationId: pump.organisation._id,
        pumpId: pump._id,
      },
    });
    if (res.error) return;
    onClose();
  });

  const canDeletePumps = permissionChecker.canDeletePumps(self.data?._id);

  return (
    <View style={styles.wrapper}>
      <Button
        color="red"
        onPress={openDialog}
        disabled={!canDeletePumps}
        isLoading={deletePump.isLoading}
      >
        Remove pump
      </Button>
      <FormError error={deletePump.error?.error} />

      <DialogModal active={dialogActive} onClose={closeDialog} onConfirm={confirmDialog} />
    </View>
  );
};

export default RemovePump;

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,

    padding: 32,

    backgroundColor: colors.silver,
  },
});
