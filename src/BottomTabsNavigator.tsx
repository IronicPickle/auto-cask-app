import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Home from "@screens/bottomTabs/home/Home";
import Organisations from "@screens/bottomTabs/organisations/Organisations";
import Profile from "@screens/bottomTabs/profile/Profile";

export type BottomTabsParamList = {
  Home: undefined;
  Organisations: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Organisations" component={Organisations} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export const useBottomTabsNavigator = () => useNavigation<NavigationProp<BottomTabsParamList>>();

export default BottomTabsNavigator;
