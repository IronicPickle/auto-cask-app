import QRCodeScanner from "react-native-qrcode-scanner";
import { BarCodeReadEvent, RNCamera } from "react-native-camera";
import { useBottomTabsNavigator } from "@src/BottomTabsNavigator";
import useForceRerender from "@hooks/useForceRerender";
import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import Button from "@components/common/Button";
import { colors } from "@lib/constants/colors";
import Icon from "react-native-vector-icons/Ionicons";

const QRCodeScannerWrapper = () => {
  const navigator = useBottomTabsNavigator();

  const [torchActive, setTorchActive] = useState(false);

  const handleRead = ({ data }: BarCodeReadEvent) => {
    navigator.navigate("BadgesStack", {
      screen: "Badge",
      params: {
        badgeId: data,
        autoUse: true,
      },
      initial: false,
    });
    resetScanner();
  };

  const [key, resetScanner] = useForceRerender();

  return (
    <View style={styles.wrapper}>
      <QRCodeScanner
        key={key}
        onRead={handleRead}
        flashMode={torchActive ? RNCamera.Constants.FlashMode.torch : undefined}
        reactivate
        fadeIn
        topContent={
          <View style={styles.topWrapper}>
            <Icon name="qr-code" style={styles.topIcon} />
            <Text style={styles.topText}>Scan a Cask QR code</Text>
          </View>
        }
        bottomContent={
          <View style={styles.bottomWrapper}>
            <Button
              size="large"
              color="black"
              textColor="white"
              iconColor={torchActive ? "yellow" : "silver"}
              endIcon={<Icon name={torchActive ? "flash" : "flash-off"} />}
              onPress={() => setTorchActive(torchActive => !torchActive)}
            >
              Toggle Flash
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default QRCodeScannerWrapper;

const styles = StyleSheet.create({
  wrapper: {},

  topWrapper: {
    flexGrow: 1,

    alignItems: "center",

    padding: 24,
  },
  topText: { color: colors.black, fontWeight: "700", fontSize: 24 },
  topIcon: { color: colors.black, fontSize: 32 },

  bottomWrapper: {
    position: "absolute",
    alignItems: "center",

    bottom: 0,

    padding: 24,
  },
});
