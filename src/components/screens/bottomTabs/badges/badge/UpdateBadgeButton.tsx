import IconButton from "@components/common/IconButton";
import { Badge } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import useBadgesContext from "../context/useBadgesContext";
import UpdateBadgeModal from "./modal/UpdateBadgeModal";

interface Props {
  badge: Badge;
}

const UpdateBadgeButton = (props: Props) => {
  const { badge } = props;

  const { self } = useGlobalContext();

  const { badges } = useBadgesContext();

  const [modalActive, setModalActive] = useState(false);

  const canUpdate = self.data._id === badge.createdBy._id;

  if (!canUpdate) return null;

  return (
    <>
      <IconButton
        size="small"
        color="blue"
        icon={<Icon name="pencil" />}
        onPress={() => setModalActive(true)}
      />

      <UpdateBadgeModal
        badge={modalActive ? badge : undefined}
        onClose={() => {
          setModalActive(false);
          badges.send({});
        }}
      />
    </>
  );
};

export default UpdateBadgeButton;
