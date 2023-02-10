import React, { PropsWithChildren } from "react";
import { Modal as RNModal, ModalProps, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "./IconButton";

interface Props {
  active?: boolean;

  animationType?: ModalProps["animationType"];

  onClose?: () => void;
}

const Modal = (props: PropsWithChildren<Props>) => {
  const { active, animationType = "fade", onClose, children } = props;

  return (
    <RNModal
      visible={active}
      animationType={animationType}
      style={styles.wrapper}
      onDismiss={onClose}
    >
      <View style={styles.contentWrapper}>{children}</View>
      <IconButton
        size="large"
        variant="flat"
        iconColor="black"
        icon={<Icon name="close" />}
        onPress={onClose}
        style={styles.closeButton}
      />
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  wrapper: {
    padding: 32,
  },

  closeButton: {
    position: "absolute",

    top: 0,
    right: 0,
    margin: 12,
  },

  contentWrapper: {
    flexGrow: 1,
  },

  buttonsWrapper: {
    alignItems: "center",
    gap: 12,
  },
});
