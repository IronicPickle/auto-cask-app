import IconButton from "@components/common/IconButton";
import { colors } from "@lib/constants/colors";
import React, { PropsWithChildren } from "react";
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  active?: boolean;

  animationType?: RNModalProps["animationType"];

  onClose?: () => void;
}

export type ModalProps = Props;

const Modal = (props: PropsWithChildren<Props>) => {
  const { active, animationType = "fade", onClose, children } = props;

  return (
    <RNModal visible={active} animationType={animationType} onDismiss={onClose} transparent>
      <Pressable style={styles.cover} onPress={onClose}>
        <Pressable style={styles.wrapper} onPress={event => event.stopPropagation()}>
          <View style={styles.contentWrapper}>{children}</View>
          <IconButton
            size="large"
            variant="flat"
            iconColor="black"
            icon={<Icon name="close" />}
            onPress={onClose}
            style={styles.closeButton}
          />
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  cover: {
    justifyContent: "center",
    alignItems: "center",

    height: "100%",
    width: "100%",

    backgroundColor: colors.coverBlack,
  },

  wrapper: {
    width: "100%",

    backgroundColor: colors.white,
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
