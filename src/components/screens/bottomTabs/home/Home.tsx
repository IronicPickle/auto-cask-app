import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import QRCodeScannerWrapper from "./qrcodeScanner/QRCodeScannerWrapper";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <QRCodeScannerWrapper />
    </SafeAreaView>
  );
};

export default Home;
