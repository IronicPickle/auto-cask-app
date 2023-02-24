import { Badge } from "@shared/ts/api/generic";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import Button from "@components/common/Button";
import { StyleSheet } from "react-native";
import UpdateBadgeImageModal from "./modal/UpdateBadgeImageModal";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";

interface Props {
  badge: Badge;
  onClose: () => void;
}

const UpdateBadgeImageButton = (props: Props) => {
  const { badge, onClose } = props;

  const { self } = useGlobalContext();

  const [modalActive, setModalActive] = useState(false);

  const canUpdate = badge.createdBy._id === self.data?._id;

  if (!canUpdate) return null;

  return (
    <>
      <Button
        size="medium"
        color="blue"
        onPress={() => setModalActive(true)}
        endIcon={<Icon name="image" />}
        justify="center"
        style={styles.button}
      >
        Update Image
      </Button>

      <UpdateBadgeImageModal
        badge={modalActive ? badge : undefined}
        onClose={() => {
          setModalActive(false);
          onClose();
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
  },
});

export default UpdateBadgeImageButton;
