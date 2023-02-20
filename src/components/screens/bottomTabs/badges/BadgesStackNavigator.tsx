import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { BottomTabsParamList } from "@src/BottomTabsNavigator";
import Badge from "./badge/Badge";
import BadgeContextProvider from "./context/BadgesContext";
import BadgeList from "./list/BadgeList";

export type BadgesStackParamList = {
  BadgeList: NavigatorScreenParams<BottomTabsParamList>;
  Badge: {
    badgeId: string;
  };
};

const { Navigator, Screen } = createStackNavigator<BadgesStackParamList>();

const BadgesStackNavigator = () => {
  return (
    <BadgeContextProvider>
      <Navigator initialRouteName="BadgeList">
        <Screen
          name="BadgeList"
          component={BadgeList}
          options={{
            title: "All Badges",
          }}
        />
        <Screen
          name="Badge"
          component={Badge}
          options={{
            title: "Badge",
          }}
        />
      </Navigator>
    </BadgeContextProvider>
  );
};

export const useBadgesStackNavigator = () => useNavigation<NavigationProp<BadgesStackParamList>>();

export default BadgesStackNavigator;
