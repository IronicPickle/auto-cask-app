import { colors } from "@lib/constants/colors";
import dayjs from "dayjs";
import { StyleSheet, Text, View } from "react-native";
import { Organisation, OrganisationPump } from "@shared/ts/api/generic";
import Modal from "@components/modals/Modal";
import TextWrapper from "@components/common/TextWrapper";
import RemovePump from "./RemovePump";
import UpdatePump from "./UpdatePump";

interface Props {
  pump?: OrganisationPump;
  onClose?: () => void;
}

const OrganisationPumpModal = (props: Props) => {
  const { pump, onClose = () => {} } = props;

  const { name, createdOn } = pump ?? {};

  return (
    <Modal active={!!pump} onClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.details}>
          <TextWrapper>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
          </TextWrapper>
          <Text style={styles.createdOn}>Created {dayjs(createdOn).format("DD/MM/YYYY")}</Text>
        </View>
      </View>

      <UpdatePump pump={pump} onClose={onClose} />
      <RemovePump pump={pump} onClose={onClose} />
    </Modal>
  );
};

export default OrganisationPumpModal;

const styles = StyleSheet.create({
  wrapper: {},

  details: {
    padding: 32,
    paddingRight: 64,
  },
  name: {
    flex: 1,

    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  createdOn: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
});
