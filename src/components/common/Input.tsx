import { colors } from "@lib/constants/colors";
import { ChangeData } from "@lib/ts/form";
import { UIColor } from "@lib/ts/generic";
import { rgba } from "@lib/utils/generic";
import { cloneElement } from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native";
import { StyleProp, StyleSheet } from "react-native";
import { TextStyle, ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  color?: UIColor;
  textColor?: UIColor;
  iconColor?: UIColor;

  variant?: "contained" | "outlined" | "flat";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";

  name?: string;
  value: string;
  type?: TextInputProps["textContentType"];
  placeholder?: string;

  disabled?: boolean;
  isLoading?: boolean;

  startIcon?: JSX.Element;
  endIcon?: JSX.Element;

  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;

  viewProps?: ViewProps;
  textInputProps?: TextInputProps;

  onChange?: (changeData: ChangeData<any, any>) => void;
}

const Input = (props: Props) => {
  const {
    color = "black",
    textColor = "white",
    iconColor = textColor,

    variant = "contained",
    size = "medium",

    name,
    value,
    type,
    placeholder,

    disabled,
    isLoading,

    startIcon,
    endIcon,

    style,
    textInputStyle,

    viewProps,
    textInputProps,

    onChange = () => {},
  } = props;

  const styles = createStyles(color, textColor, iconColor, size, variant);

  return (
    <View style={[styles.view, disabled && styles.disabled, style]} {...viewProps}>
      {startIcon &&
        cloneElement(startIcon, {
          style: [styles.icon, startIcon.props.style],
        })}
      <TextInput
        editable={!disabled && !isLoading}
        value={value}
        textContentType={type}
        secureTextEntry={type === "password"}
        placeholder={placeholder}
        onChangeText={value => onChange({ value, name })}
        style={[styles.textInput, textInputStyle]}
        placeholderTextColor={rgba(colors[textColor], 0.5)}
        {...textInputProps}
      />
      {isLoading ? (
        <ActivityIndicator color={colors[iconColor]} size={styles.icon.fontSize} />
      ) : (
        endIcon &&
        cloneElement(endIcon, {
          style: [styles.icon, endIcon.props.style],
        })
      )}
    </View>
  );
};

export default Input;

const createStyles = (
  color: UIColor,
  textColor: UIColor,
  iconColor: UIColor,
  size: Props["size"] = "medium",
  variant: Props["variant"] = "contained",
) => {
  const sizeStyles = createSizeStyles()[size];
  const variantStyles = createVariantStyles(color)[variant];

  return StyleSheet.create({
    disabled: {
      opacity: 0.5,
    },
    view: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",

      borderStyle: "solid",
      borderWidth: 2,

      ...sizeStyles.view,
      ...variantStyles.view,
    },
    textInput: {
      width: "100%",

      color: colors[textColor],

      ...sizeStyles.textInput,
      ...variantStyles.textInput,
    },
    icon: {
      color: colors[iconColor],
      ...sizeStyles.icon,
      ...variantStyles.icon,
    },
  });
};

const createSizeStyles = () => ({
  "extra-small": StyleSheet.create({
    view: {
      gap: 5,

      paddingHorizontal: 8,

      borderRadius: 3,
    },
    textInput: {
      paddingVertical: 0,

      fontSize: 10,

      height: 22,
    },
    icon: {
      fontSize: 12,
    },
  }),
  small: StyleSheet.create({
    view: {
      gap: 8,

      paddingHorizontal: 12,

      borderRadius: 4,
    },
    textInput: {
      paddingVertical: 2,

      fontSize: 12,
    },
    icon: {
      fontSize: 14,
    },
  }),
  medium: StyleSheet.create({
    view: {
      gap: 12,

      paddingHorizontal: 16,

      borderRadius: 5,
    },
    textInput: {
      paddingVertical: 7,

      fontSize: 16,
    },
    icon: {
      fontSize: 18,
    },
  }),
  large: StyleSheet.create({
    view: {
      gap: 16,

      paddingHorizontal: 24,

      borderRadius: 6,
    },
    textInput: {
      paddingVertical: 13.5,

      fontSize: 20,
    },
    icon: {
      fontSize: 22,
    },
  }),
  "extra-large": StyleSheet.create({
    view: {
      gap: 24,

      paddingHorizontal: 38,

      borderRadius: 8,
    },
    textInput: {
      paddingVertical: 24,

      fontSize: 24,
    },
    icon: {
      fontSize: 26,
    },
  }),
});

const createVariantStyles = (color: UIColor) => ({
  contained: StyleSheet.create({
    view: {
      borderColor: colors[color],
      backgroundColor: colors[color],
    },
    textInput: {},
    icon: {},
  }),
  outlined: StyleSheet.create({
    view: {
      borderColor: colors[color],
    },
    textInput: {},
    icon: {},
  }),
  flat: StyleSheet.create({
    view: {
      borderColor: "transparent",
    },
    textInput: {},
    icon: {},
  }),
});
