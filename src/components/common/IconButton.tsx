import { colors } from "@lib/constants/colors";
import { UIColor } from "@lib/ts/generic";
import { cloneElement } from "react";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet } from "react-native";
import { PressableProps } from "react-native/Libraries/Components/Pressable/Pressable";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  color?: UIColor;
  iconColor?: UIColor;

  variant?: "contained" | "outlined" | "flat";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";

  rounded?: boolean;

  disabled?: boolean;
  isLoading?: boolean;

  icon?: JSX.Element;

  style?: StyleProp<ViewStyle>;

  pressableProps?: PressableProps;

  onPress?: PressableProps["onPress"];
}

const IconButton = (props: Props) => {
  const {
    color = "black",
    iconColor = "white",

    variant = "contained",
    size = "medium",

    rounded = false,

    disabled,
    isLoading,

    icon,

    style,

    pressableProps,

    onPress,
  } = props;

  const styles = createStyles(color, iconColor, size, variant, rounded);

  return (
    <Pressable
      disabled={disabled || isLoading}
      style={[styles.pressable, disabled && styles.disabled, style]}
      onPress={onPress}
      {...pressableProps}
    >
      {isLoading ? (
        <ActivityIndicator color={colors[iconColor]} size={styles.icon.fontSize} />
      ) : (
        icon &&
        cloneElement(icon, {
          style: [styles.icon, icon.props.style],
        })
      )}
    </Pressable>
  );
};

export default IconButton;

const createStyles = (
  color: UIColor,
  iconColor: UIColor,
  size: Props["size"] = "medium",
  variant: Props["variant"] = "contained",
  rounded: boolean,
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

      borderStyle: "solid",
      borderWidth: 2,

      ...sizeStyles.pressable,
      ...variantStyles.pressable,

      ...(rounded ? { borderRadius: 100 } : {}),
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

      padding: 3,

      borderRadius: 3,
    },
    icon: {
      fontSize: 13,
    },
  }),
  small: StyleSheet.create({
    pressable: {
      gap: 8,

      padding: 6,

      borderRadius: 4,
    },
    icon: {
      fontSize: 16,
    },
  }),
  medium: StyleSheet.create({
    pressable: {
      gap: 12,

      padding: 8,

      borderRadius: 5,
    },
    icon: {
      fontSize: 20,
    },
  }),
  large: StyleSheet.create({
    pressable: {
      gap: 16,

      padding: 10,

      borderRadius: 6,
    },
    icon: {
      fontSize: 26,
    },
  }),
  "extra-large": StyleSheet.create({
    pressable: {
      gap: 24,

      padding: 16,

      borderRadius: 8,
    },
    icon: {
      fontSize: 40,
    },
  }),
});

const createVariantStyles = (color: UIColor) => ({
  contained: StyleSheet.create({
    pressable: {
      borderColor: colors[color],
      backgroundColor: colors[color],
    },
    icon: {},
  }),
  outlined: StyleSheet.create({
    pressable: {
      borderColor: colors[color],
    },
    icon: {},
  }),
  flat: StyleSheet.create({
    pressable: {
      borderColor: "transparent",
    },
    icon: {},
  }),
});
