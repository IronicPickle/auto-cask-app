import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Home from "@screens/bottomTabs/home/Home";
import Profile from "@screens/bottomTabs/profile/Profile";
import OrganisationsStackNavigator from "@screens/bottomTabs/organisations/OrganisationsStackNavigator";

export type BottomTabsParamList = {
  Home: undefined;
  OrganisationsStack: undefined;
  Profile: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
        }}
      />
      <Screen
        name="OrganisationsStack"
        component={OrganisationsStackNavigator}
        options={{
          title: "Organisations",
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
        }}
      />
    </Navigator>
  );
};

export const useBottomTabsNavigator = () => useNavigation<NavigationProp<BottomTabsParamList>>();

export default BottomTabsNavigator;
