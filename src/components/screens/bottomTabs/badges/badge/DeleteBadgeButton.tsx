import useDeleteBadge from "@api/badges/hooks/useDeleteBadge";
import IconButton from "@components/common/IconButton";
import DialogModal from "@components/modals/DialogModal";
import useDialogModal from "@components/modals/hooks/useDialogModal";
import { Badge } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useBadgesStackNavigator } from "../BadgesStackNavigator";
import useBadgesContext from "../context/useBadgesContext";

interface Props {
  badge?: Badge;
}

const DeleteBadgeButton = (props: Props) => {
  const { badge } = props;

  const { self } = useGlobalContext();

  const { badges } = useBadgesContext();

  const navigator = useBadgesStackNavigator();

  const deleteBadge = useDeleteBadge(null);

  const { dialogActive, openDialog, closeDialog, confirmDialog } = useDialogModal(async () => {
    if (!badge) return;
    const res = await deleteBadge.send({
      params: { badgeId: badge._id },
    });
    if (res.error) return;

    badges.send({});
    navigator.navigate("BadgeList");
  });

  const canDelete = self.data._id === badge?.createdBy._id;

  if (!canDelete) return null;

  return (
    <>
      <IconButton size="small" color="red" icon={<Icon name="trash" />} onPress={openDialog} />

      <DialogModal
        title={`Are you sure you want to delete ${badge?.name}?`}
        active={dialogActive}
        onClose={closeDialog}
        onConfirm={confirmDialog}
        requiredText={badge?.name}
      />
    </>
  );
};

export default DeleteBadgeButton;
