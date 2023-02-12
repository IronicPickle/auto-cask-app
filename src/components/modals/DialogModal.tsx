import Button, { ButtonProps } from "@components/common/Button";
import Input from "@components/common/Input";
import { colors } from "@lib/constants/colors";
import React, { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal, { ModalProps } from "./Modal";

interface Props extends ModalProps {
  title?: string;
  subTitle?: string;

  confirmText?: string;
  cancelText?: string;

  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;

  requiredText?: string;

  onConfirm?: () => void;
  onCancel?: () => void;
}

const DialogModal = (props: PropsWithChildren<Props>) => {
  const {
    requiredText,

    title = "Are you sure?",
    subTitle = requiredText ? `Type '${requiredText}' to continue.` : "Press confirm to continue.",
    onConfirm,

    confirmText = "Confirm",
    cancelText = "Cancel",

    confirmButtonProps,
    cancelButtonProps,

    onCancel,

    children,

    ...modalProps
  } = props;

  const [requiredTextValue, setRequiredTextValue] = useState("");

  const onClose = () => {
    setRequiredTextValue("");
    if (modalProps.onClose) modalProps.onClose();
  };

  return (
    <Modal {...modalProps}>
      <View style={styles.titlesWrapper}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>

      {requiredText && (
        <Input
          variant="outlined"
          color="black"
          textColor="black"
          value={requiredTextValue}
          placeholder={requiredText}
          onChange={({ value }) => setRequiredTextValue(value)}
          style={styles.input}
        />
      )}

      {children}

      <View style={styles.buttonWrapper}>
        <Button
          color="red"
          textColor="white"
          onPress={() => {
            if (onCancel) onCancel();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          color="blue"
          textColor="white"
          disabled={!!requiredText && requiredText !== requiredTextValue}
          onPress={() => {
            if (onConfirm) onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </View>
    </Modal>
  );
};

export default DialogModal;

const styles = StyleSheet.create({
  titlesWrapper: {
    alignItems: "center",
    justifyContent: "center",

    padding: 32,
  },
  title: {
    width: "100%",

    paddingRight: 64,

    color: colors.black,
    fontSize: 24,
    fontWeight: "700",
  },
  subTitle: {
    width: "100%",

    color: colors.gray,
    fontSize: 16,
    fontWeight: "500",
  },

  input: {
    marginHorizontal: 32,
    marginBottom: 32,
  },

  buttonWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    paddingHorizontal: 32,
    paddingBottom: 32,
  },
});
