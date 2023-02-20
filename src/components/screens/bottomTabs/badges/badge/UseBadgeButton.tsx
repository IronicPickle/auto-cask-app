import { Badge } from "@shared/ts/api/generic";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import useBadgesContext from "../context/useBadgesContext";
import Button from "@components/common/Button";
import UseBadgeModal from "./use/UseBadgeModal";

interface Props {
  badge: Badge;
}

const UseBadgeButton = (props: Props) => {
  const { badge } = props;

  const { self } = useGlobalContext();

  const { badges } = useBadgesContext();

  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <Button
        size="medium"
        color="green"
        onPress={() => setModalActive(true)}
        endIcon={<Icon name="beer" />}
        justify="center"
      >
        Use Badge
      </Button>

      <UseBadgeModal
        badge={modalActive ? badge : undefined}
        onClose={() => {
          setModalActive(false);
        }}
      />
    </>
  );
};

export default UseBadgeButton;
