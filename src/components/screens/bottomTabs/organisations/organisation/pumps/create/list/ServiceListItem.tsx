import { colors } from "@lib/constants/colors";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import TextWrapper from "@components/common/TextWrapper";
import { AutoCaskService } from "@lib/ts/generic";
import useSendFingerprint from "@api/fingerprint/hooks/useSendFingerprint";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import FormError from "@components/form/FormError";

interface Props {
  service: AutoCaskService;
  onFingerprint: () => void;
}

const ServiceListItem = (props: Props) => {
  const { service, onFingerprint } = props;

  const { self } = useGlobalContext();

  const { name, fullName, host, port } = service;

  const fingerprint = useSendFingerprint(undefined);

  const sendFingerprint = async () => {
    if (!self.data) return;
    const url = `http://${host}:${port}`;
    const res = await fingerprint.send({ url, userId: self.data._id });
    if (res.error) return;
    onFingerprint();
  };

  return (
    <Pressable style={styles.wrapper} onPress={sendFingerprint}>
      <View style={styles.detailsWrapper}>
        <TextWrapper>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </TextWrapper>
        <TextWrapper>
          <Text style={styles.fullName}>{fullName}</Text>
        </TextWrapper>
      </View>

      {fingerprint.isLoading && <ActivityIndicator color={colors.green} size={32} />}

      <FormError error={fingerprint.error?.error} />
    </Pressable>
  );
};

export default ServiceListItem;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,

    paddingVertical: 16,
    paddingHorizontal: 24,

    backgroundColor: colors.silver,
  },

  detailsWrapper: {
    flex: 1,
  },
  name: {
    flex: 1,

    color: colors.black,
    fontSize: 18,
    fontWeight: "700",
  },
  fullName: {
    flex: 1,

    color: colors.black,
    fontSize: 14,
    fontWeight: "400",
  },
});
