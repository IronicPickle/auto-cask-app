import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}

const TextWrapper = (props: PropsWithChildren<Props>) => {
  const { style, children } = props;

  return (
    <View
      style={[
        {
          flexDirection: "row",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default TextWrapper;
