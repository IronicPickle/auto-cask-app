import { colors } from "@lib/constants/colors";
import { ChangeData } from "@lib/ts/form";
import { UIColor } from "@lib/ts/generic";
import React, { cloneElement } from "react";
import { ActivityIndicator, View, ViewProps } from "react-native";
import { StyleProp, StyleSheet } from "react-native";
import { TextStyle, ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { Picker, PickerItemProps } from "@react-native-picker/picker";
import { ItemValue } from "@react-native-picker/picker/typings/Picker";

interface Props {
  color?: UIColor;
  textColor?: UIColor;
  iconColor?: UIColor;

  variant?: "contained" | "outlined" | "flat";
  size?: "extra-small" | "small" | "medium" | "large" | "extra-large";

  name?: string;
  value: string;
  items: PickerItemProps<ItemValue>[];
  placeholder?: string;

  disabled?: boolean;
  isLoading?: boolean;

  startIcon?: JSX.Element;
  endIcon?: JSX.Element;

  style?: StyleProp<ViewStyle>;
  pickerStyle?: StyleProp<TextStyle>;

  viewProps?: ViewProps;
  pickerProps?: PickerItemProps;

  onChange?: (changeData: ChangeData<any, any>) => void;
}

const Select = (props: Props) => {
  const {
    color = "black",
    textColor = "white",
    iconColor = textColor,

    variant = "contained",
    size = "medium",

    name,
    value,
    items,
    placeholder,

    disabled,
    isLoading,

    startIcon,
    endIcon,

    style,
    pickerStyle,

    viewProps,
    pickerProps,

    onChange = () => {},
  } = props;

  const styles = createStyles(color, textColor, iconColor, size, variant);

  return (
    <View style={[styles.view, disabled && styles.disabled, style]} {...viewProps}>
      {startIcon &&
        cloneElement(startIcon, {
          style: [styles.icon, startIcon.props.style],
        })}
      <Picker
        enabled={!disabled && !isLoading}
        selectedValue={value}
        placeholder={placeholder}
        onValueChange={value => onChange({ value, name })}
        style={[styles.picker, pickerStyle]}
        {...pickerProps}
      >
        {items.map((item, i) => (
          <Picker.Item key={i} {...item} />
        ))}
      </Picker>
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

export default Select;

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
    picker: {
      width: "100%",

      color: colors[textColor],

      ...sizeStyles.picker,
      ...variantStyles.picker,
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
    picker: {
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
    picker: {
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
    picker: {
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
    picker: {
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
    picker: {
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
    picker: {},
    icon: {},
  }),
  outlined: StyleSheet.create({
    view: {
      borderColor: colors[color],
    },
    picker: {},
    icon: {},
  }),
  flat: StyleSheet.create({
    view: {
      borderColor: "transparent",
    },
    picker: {},
    icon: {},
  }),
});
