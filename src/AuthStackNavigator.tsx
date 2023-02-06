import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Login from "@screens/authStack/login/Login";
import Register from "@screens/authStack/register/Register";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};

export const useAuthStackNavigator = () => useNavigation<NavigationProp<AuthStackParamList>>();

export default AuthStackNavigator;
