import IconButton from "@components/common/IconButton";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import CreateOrganisationModal from "./CreateOrganisationModal";
import { StyleSheet } from "react-native";
import useOrganisationsContext from "../../context/useOrganisationsContext";

const CreateOrganisationButton = () => {
  const { memberships } = useOrganisationsContext();

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

      <CreateOrganisationModal
        active={modalActive}
        onClose={() => {
          setModalActive(false);
          memberships.send({});
        }}
      />
    </>
  );
};

export default CreateOrganisationButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
});
