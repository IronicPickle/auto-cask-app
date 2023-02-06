import { colors } from "@lib/constants/colors";
import { PropsWithChildren } from "react";
import { Text } from "react-native";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface Props {
  errors?: string[];

  gap?: number;

  style?: StyleProp<ViewStyle>;
}

const FormErrors = (props: PropsWithChildren<Props>) => {
  const {
    errors,

    gap = 2,

    style,

    children,
  } = props;

  if (!errors) return null;

  return (
    <View style={[styles.view, { gap }, style]}>
      {errors.map((error, i) => (
        <Text style={[styles.text]} key={i}>
          {error}
        </Text>
      ))}
      {children}
    </View>
  );
};

export default FormErrors;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  text: {
    color: colors.red,
    fontSize: 14,
  },
});
