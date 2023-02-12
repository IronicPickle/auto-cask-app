import useDeleteOrganisation from "@api/organisation/hooks/useDeleteOrganisation";
import IconButton from "@components/common/IconButton";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { Organisation } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import useOrganisationsContext from "../context/useOrganisationsContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useOrganisationsStackNavigator } from "../OrganisationsStackNavigator";

interface Props {
  organisation?: Organisation;
}

const RemoveOrganisationButton = (props: Props) => {
  const { organisation } = props;

  const { self } = useGlobalContext();

  const { permissionChecker } = useOrganisationsContext();

  const navigator = useOrganisationsStackNavigator();

  const deleteOrganisation = useDeleteOrganisation(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!organisation) return;
    const res = await deleteOrganisation.send({
      organisationId: organisation?._id,
    });
    if (res.error) return;
    navigator.navigate("OrganisationList");
  });

  const canDelete = permissionChecker.canDelete(self.data?._id);

  if (!canDelete) return null;

  return (
    <>
      <IconButton size="small" color="red" icon={<Icon name="trash" />} onPress={openDialog} />

      <DialogModal
        active={dialogActive}
        onClose={closeDialog}
        onConfirm={confirmDialog}
        requiredText={organisation?.name}
      />
    </>
  );
};

export default RemoveOrganisationButton;
