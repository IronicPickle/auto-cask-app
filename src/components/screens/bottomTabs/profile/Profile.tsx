import Button from "@components/common/Button";
import useGlobalContext from "@src/globalContext/hooks/useGlobalContext";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { logout } = useGlobalContext();

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile screen</Text>

      <Button onPress={logout}>Logout</Button>
    </SafeAreaView>
  );
};

export default Profile;
