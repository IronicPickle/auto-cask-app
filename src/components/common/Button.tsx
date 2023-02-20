import { colors } from "@lib/constants/colors";
import { UIColor } from "@lib/ts/generic";
import { cloneElement, PropsWithChildren } from "react";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextProps } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";
import { TextStyle, ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  color?: UIColor;
  textColor?: UIColor;
  iconColor?: UIColor;

  variant?: "contained" | "outlined" | "flat";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";

  rounded?: boolean;
  justify?: ViewStyle["justifyContent"];

  disabled?: boolean;
  isLoading?: boolean;

  startIcon?: JSX.Element;
  endIcon?: JSX.Element;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  pressableProps?: PressableProps;
  textProps?: TextProps;

  onPress?: PressableProps["onPress"];
}

export type ButtonProps = Props;

const Button = (props: PropsWithChildren<Props>) => {
  const {
    color = "black",
    textColor = "white",
    iconColor = textColor,

    variant = "contained",
    size = "medium",

    rounded = false,
    justify,

    disabled,
    isLoading,

    startIcon,
    endIcon,

    style,
    textStyle,

    pressableProps,
    textProps,

    onPress,

    children,
  } = props;

  const styles = createStyles(color, textColor, iconColor, size, variant, rounded, justify);

  return (
    <Pressable
      disabled={disabled || isLoading}
      style={[styles.pressable, disabled && styles.disabled, style]}
      onPress={onPress}
      {...pressableProps}
    >
      {startIcon &&
        cloneElement(startIcon, {
          style: [styles.icon, startIcon.props.style],
        })}
      <Text style={[styles.text, textStyle]} {...textProps}>
        {children}
      </Text>
      {isLoading ? (
        <ActivityIndicator color={colors[iconColor]} size={styles.icon.fontSize} />
      ) : (
        endIcon &&
        cloneElement(endIcon, {
          style: [styles.icon, endIcon.props.style],
        })
      )}
    </Pressable>
  );
};

export default Button;

const createStyles = (
  color: UIColor,
  textColor: UIColor,
  iconColor: UIColor,
  size: Props["size"] = "medium",
  variant: Props["variant"] = "contained",
  rounded: boolean,
  justify: Props["justify"],
) => {
  const sizeStyles = createSizeStyles()[size];
  const variantStyles = createVariantStyles(color)[variant];

  return StyleSheet.create({
    disabled: {
      opacity: 0.5,
    },
    pressable: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: justify,

      borderStyle: "solid",
      borderWidth: 2,

      ...(rounded ? { borderRadius: 100 } : {}),

      ...sizeStyles.pressable,
      ...variantStyles.pressable,
    },
    text: {
      color: colors[textColor],
      ...sizeStyles.text,
      ...variantStyles.text,
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
    pressable: {
      gap: 5,

      paddingHorizontal: 8,
      paddingVertical: 4,

      borderRadius: 3,
    },
    text: {
      fontSize: 10,
    },
    icon: {
      fontSize: 12,
    },
  }),
  small: StyleSheet.create({
    pressable: {
      gap: 8,

      paddingHorizontal: 12,
      paddingVertical: 8,

      borderRadius: 4,
    },
    text: {
      fontSize: 12,
    },
    icon: {
      fontSize: 14,
    },
  }),
  medium: StyleSheet.create({
    pressable: {
      gap: 12,

      paddingHorizontal: 16,
      paddingVertical: 10,

      borderRadius: 5,
    },
    text: {
      fontSize: 16,
    },
    icon: {
      fontSize: 18,
    },
  }),
  large: StyleSheet.create({
    pressable: {
      gap: 16,

      paddingHorizontal: 24,
      paddingVertical: 14,

      borderRadius: 6,
    },
    text: {
      fontSize: 20,
    },
    icon: {
      fontSize: 22,
    },
  }),
  "extra-large": StyleSheet.create({
    pressable: {
      gap: 24,

      paddingHorizontal: 36,
      paddingVertical: 24,

      borderRadius: 8,
    },
    text: {
      fontSize: 24,
    },
    icon: {
      fontSize: 26,
    },
  }),
});

const createVariantStyles = (color: UIColor) => ({
  contained: StyleSheet.create({
    pressable: {
      borderColor: colors[color],
      backgroundColor: colors[color],
    },
    text: {},
    icon: {},
  }),
  outlined: StyleSheet.create({
    pressable: {
      borderColor: colors[color],
    },
    text: {},
    icon: {},
  }),
  flat: StyleSheet.create({
    pressable: {
      borderColor: "transparent",
    },
    text: {},
    icon: {},
  }),
});
