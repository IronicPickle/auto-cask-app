import { Badge } from "@shared/ts/api/generic";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "@components/common/Button";
import { StyleSheet } from "react-native";
import useGetBadgeQrcode from "@api/badges/qrcode/hooks/useGetBadgeQrcode";

interface Props {
  badge: Badge;
}

const UseBadgeButton = (props: Props) => {
  const { badge } = props;

  const qrcode = useGetBadgeQrcode(undefined);

  return (
    <>
      <Button
        size="medium"
        color="teal"
        onPress={() =>
          qrcode.send({
            params: {
              badgeId: badge._id,
              fileName: `${badge.name} - ${badge.breweryName}`,
            },
          })
        }
        endIcon={<Icon name="qr-code" />}
        justify="center"
        style={styles.button}
        isLoading={qrcode.isLoading}
      >
        Get QR Code
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexGrow: 1,
  },
});

export default UseBadgeButton;
