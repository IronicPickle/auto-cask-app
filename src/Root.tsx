import React from "react";
import BottomTabsNavigator from "./BottomTabsNavigator";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import useGlobalContext from "./globalContext/hooks/useGlobalContext";
import AuthStackNavigator from "./AuthStackNavigator";

const Root = () => {
  const { self } = useGlobalContext();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="rgba(15,20,20,1)" />

      {self.data ? <BottomTabsNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Root;
