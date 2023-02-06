import { colors } from "@lib/constants/colors";
import { PropsWithChildren } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import { Text } from "react-native";
import { StyleProp, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  error?: string;

  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const FormError = (props: PropsWithChildren<Props>) => {
  const {
    error,

    style,
    iconStyle,
    textStyle,
  } = props;

  if (!error) return null;

  return (
    <View style={[styles.view, style]}>
      <Icon name="alert-circle-outline" style={[styles.icon, iconStyle]} />
      <Text style={[styles.text, textStyle]}>{error}</Text>
    </View>
  );
};

export default FormError;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    color: colors.red,
    fontSize: 22,
  },

  text: {
    color: colors.red,
    fontSize: 14,
  },
});
