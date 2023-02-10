import { colors } from "@lib/constants/colors";
import { UIColor } from "@lib/ts/generic";
import { PropsWithChildren } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "./Button";
import IconButton from "./IconButton";

interface Props {
  isLoading?: boolean;
  error?: string;
  isEmpty?: boolean;
  emptyMessage?: string;

  color?: UIColor;

  retry?: () => void;
}

const DataCheck = (props: PropsWithChildren<Props>) => {
  const {
    isLoading,
    error,
    isEmpty,
    emptyMessage = "No data available",

    color = "black",

    retry,

    children,
  } = props;

  const retryButton = (
    <IconButton
      size="small"
      color="black"
      iconColor="white"
      rounded
      icon={<Icon name="refresh" />}
      onPress={retry}
    />
  );

  if (isLoading) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator color={colors[color]} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.errorText}>{error}</Text>
        {retry && retryButton}
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
        {retry && retryButton}
      </View>
    );
  }

  return <>{children}</>;
};

export default DataCheck;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,

    width: "100%",
    height: "100%",

    inset: 0,
  },
  errorText: {
    color: colors.red,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  emptyText: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
