import IconButton from "@components/common/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import { StyleSheet } from "react-native";
import useBadgesContext from "../../context/useBadgesContext";
import CreateBadgeModal from "./CreateBadgeModal";

const CreateBadgeButton = () => {
  const { badges } = useBadgesContext();

  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <IconButton
        size="large"
        color="green"
        rounded
        icon={<Icon name="add" />}
        onPress={() => setModalActive(true)}
        style={styles.button}
      />

      <CreateBadgeModal
        active={modalActive}
        onClose={() => {
          setModalActive(false);
          badges.send({});
        }}
      />
    </>
  );
};

export default CreateBadgeButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
});
