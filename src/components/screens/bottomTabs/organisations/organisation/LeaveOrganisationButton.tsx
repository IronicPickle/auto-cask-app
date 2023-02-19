import IconButton from "@components/common/IconButton";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { Organisation } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import useOrganisationsContext from "../context/useOrganisationsContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useOrganisationsStackNavigator } from "../OrganisationsStackNavigator";
import useLeaveOrganisation from "@api/organisations/hooks/useLeaveOrganisation";

interface Props {
  organisation?: Organisation;
}

const LeaveOrganisationButton = (props: Props) => {
  const { organisation } = props;

  const { self } = useGlobalContext();

  const { permissionChecker, memberships } = useOrganisationsContext();

  const navigator = useOrganisationsStackNavigator();

  const leaveOrganisation = useLeaveOrganisation(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!organisation) return;
    const res = await leaveOrganisation.send({
      params: {
        organisationId: organisation?._id,
      },
    });
    if (res.error) return;

    memberships.send({});
    navigator.navigate("OrganisationList");
  });

  const isMember =
    permissionChecker.isMember(self.data?._id) && !permissionChecker.isOwner(self.data?._id);

  if (!isMember) return null;

  return (
    <>
      <IconButton size="small" color="red" icon={<Icon name="log-out" />} onPress={openDialog} />

      <DialogModal
        title={`Are you sure you want to leave ${organisation?.name}?`}
        active={dialogActive}
        onClose={closeDialog}
        onConfirm={confirmDialog}
      />
    </>
  );
};

export default LeaveOrganisationButton;
