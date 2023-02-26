import { colors } from "@lib/constants/colors";
import { ChangeData } from "@lib/ts/form";
import { UIColor } from "@lib/ts/generic";
import { rgba } from "@lib/utils/generic";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { Pressable, PressableProps } from "react-native";
import { StyleProp, StyleSheet } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { Asset } from "react-native-image-picker/lib/typescript/types";
import Icon from "react-native-vector-icons/Ionicons";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface Props {
  color?: UIColor;
  textColor?: UIColor;
  iconColor?: UIColor;

  variant?: "contained" | "outlined" | "flat";

  rounded?: boolean;

  name?: string;
  value?: Asset;
  placeholderSrc?: string;

  disabled?: boolean;
  isLoading?: boolean;

  style?: StyleProp<ViewStyle>;

  viewProps?: PressableProps;

  onChange?: (changeData: ChangeData<any, any>) => void;
}

const ImagePicker = (props: Props) => {
  const {
    color = "black",
    textColor = "white",
    iconColor = textColor,

    variant = "contained",

    rounded = false,

    name,
    value,
    placeholderSrc,

    disabled,
    isLoading,

    style,

    viewProps,

    onChange = () => {},
  } = props;

  const styles = createStyles(color, textColor, iconColor, variant, rounded);

  const handlePicker = async () => {
    const { assets, didCancel, errorCode, errorMessage } = await launchImageLibrary({
      mediaType: "photo",
    });

    if (didCancel || errorCode || errorMessage) return;

    const [image] = assets ?? [];

    if (!image) return;

    onChange({ name, value: image });
  };

  return (
    <Pressable
      style={[styles.view, disabled && styles.disabled, style]}
      disabled={disabled}
      onPress={handlePicker}
      {...viewProps}
    >
      {(value || placeholderSrc) && (
        <Image
          source={{
            uri: value?.uri || placeholderSrc,
          }}
          style={styles.image}
        />
      )}
      <View style={styles.ctaWrapper}>
        {isLoading ? (
          <ActivityIndicator color={colors[iconColor]} size={styles.icon.fontSize} />
        ) : (
          <Icon name="image" style={styles.icon} />
        )}
        <Text style={styles.text}>Tap to change</Text>
      </View>
    </Pressable>
  );
};

export default ImagePicker;

const createStyles = (
  color: UIColor,
  textColor: UIColor,
  iconColor: UIColor,
  variant: Props["variant"] = "contained",
  rounded: boolean,
) => {
  const variantStyles = createVariantStyles(color)[variant];

  return StyleSheet.create({
    disabled: {
      opacity: 0.5,
    },
    view: {
      alignItems: "center",
      justifyContent: "center",

      borderStyle: "solid",
      borderWidth: 2,

      width: "100%",
      aspectRatio: "1 / 1",

      ...(rounded ? { borderRadius: 100 } : {}),

      ...variantStyles.view,
    },
    ctaWrapper: {
      justifyContent: "center",
      alignItems: "center",

      paddingHorizontal: 8,
      paddingVertical: 4,

      backgroundColor: rgba(colors[color], 0.75),
      borderRadius: 5,
    },
    image: {
      position: "absolute",

      width: "100%",
      height: "100%",
    },
    icon: {
      color: colors[iconColor],
      fontSize: 22,
      ...variantStyles.icon,
    },
    text: {
      color: colors[textColor],
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      ...variantStyles.text,
    },
  });
};

const createVariantStyles = (color: UIColor) => ({
  contained: StyleSheet.create({
    view: {
      borderColor: colors[color],
      backgroundColor: colors[color],
    },
    icon: {},
    text: {},
  }),
  outlined: StyleSheet.create({
    view: {
      borderColor: colors[color],
    },
    icon: {},
    text: {},
  }),
  flat: StyleSheet.create({
    view: {
      borderColor: "transparent",
    },
    icon: {},
    text: {},
  }),
});
