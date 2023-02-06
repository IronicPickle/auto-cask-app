import { UIColor } from "@lib/ts/generic";
import { PropsWithChildren } from "react";
import { Text } from "react-native";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import FormErrors from "./FormErrors";

interface Props {
  label?: string;
  errors?: string[];

  gap?: number;

  labelColor?: UIColor;
  labelSize?: number;

  style?: StyleProp<ViewStyle>;
}

const FormEntry = (props: PropsWithChildren<Props>) => {
  const {
    label,
    errors,

    gap = 6,

    labelColor = "black",
    labelSize = 18,

    style,

    children,
  } = props;

  return (
    <View style={[styles.view, { gap }, style]}>
      {label && (
        <Text
          style={[
            {
              color: labelColor,
              fontSize: labelSize,
            },
            styles.text,
          ]}
        >
          {label}
        </Text>
      )}
      {children}
      <FormErrors errors={errors} />
    </View>
  );
};

export default FormEntry;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "flex-start",
  },
  text: {
    fontWeight: "700",
  },
});
