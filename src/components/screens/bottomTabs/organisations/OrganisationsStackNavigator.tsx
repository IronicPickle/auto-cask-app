import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, NavigatorScreenParams, useNavigation } from "@react-navigation/native";
import { BottomTabsParamList } from "@src/BottomTabsNavigator";
import Organisation from "./organisation/Organisation";
import OrganisationsContextProvider from "./context/OrganisationsContext";
import OrganisationList from "./list/OrganisationList";

export type OrganisationsStackParamList = {
  OrganisationList: NavigatorScreenParams<BottomTabsParamList>;
  Organisation: {
    organisationId: string;
  };
};

const { Navigator, Screen } = createStackNavigator<OrganisationsStackParamList>();

const OrganisationsStackNavigator = () => {
  return (
    <OrganisationsContextProvider>
      <Navigator initialRouteName="OrganisationList">
        <Screen
          name="OrganisationList"
          component={OrganisationList}
          options={{
            title: "Your Organisations",
          }}
        />
        <Screen
          name="Organisation"
          component={Organisation}
          options={{
            title: "Organisation",
          }}
        />
      </Navigator>
    </OrganisationsContextProvider>
  );
};

export const useOrganisationsStackNavigator = () =>
  useNavigation<NavigationProp<OrganisationsStackParamList>>();

export default OrganisationsStackNavigator;
