import { Badge } from "@shared/ts/api/generic";
import Icon from "react-native-vector-icons/Ionicons";
import { useState } from "react";
import Button from "@components/common/Button";
import UseBadgeModal from "./use/UseBadgeModal";
import { StyleSheet } from "react-native";

interface Props {
  badge: Badge;
  autoUse?: boolean;
}

const UseBadgeButton = (props: Props) => {
  const { badge, autoUse } = props;

  const [modalActive, setModalActive] = useState(autoUse);

  return (
    <>
      <Button
        size="medium"
        color="green"
        onPress={() => setModalActive(true)}
        endIcon={<Icon name="beer" />}
        justify="center"
        style={styles.button}
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

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
  },
});

export default UseBadgeButton;
