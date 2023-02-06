import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  gap?: number;

  style?: StyleProp<ViewStyle>;
}

const FormRow = (props: PropsWithChildren<Props>) => {
  const { gap = 8, style, children } = props;

  return <View style={[styles.view, { gap }, style]}>{children}</View>;
};

export default FormRow;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    alignItems: "flex-start",
  },
});
