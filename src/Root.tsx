import React from "react";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useGlobalContext from "./globalContext/hooks/useGlobalContext";
import AuthStackNavigator from "./AuthStackNavigator";

const Root = () => {
  const { user } = useGlobalContext();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="rgba(15,20,20,1)" />

      {user ? <BottomTabsNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Root;
