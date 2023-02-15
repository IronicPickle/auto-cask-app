import IconButton from "@components/common/IconButton";
import { Organisation } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Icon from "react-native-vector-icons/Ionicons";
import UpdateOrganisationModal from "./modal/UpdateOrganisationModal";
import { useState } from "react";
import useOrganisationsContext from "../context/useOrganisationsContext";

interface Props {
  organisation: Organisation;
}

const UpdateOrganisationButton = (props: Props) => {
  const { organisation } = props;

  const { self } = useGlobalContext();

  const { permissionChecker, memberships } = useOrganisationsContext();

  const [modalActive, setModalActive] = useState(false);

  const canUpdate = permissionChecker.canUpdate(self.data?._id);

  if (!canUpdate) return null;

  return (
    <>
      <IconButton
        size="small"
        color="blue"
        icon={<Icon name="pencil" />}
        onPress={() => setModalActive(true)}
      />

      <UpdateOrganisationModal
        organisation={modalActive ? organisation : undefined}
        onClose={() => {
          setModalActive(false);
          memberships.send({});
        }}
      />
    </>
  );
};

export default UpdateOrganisationButton;
