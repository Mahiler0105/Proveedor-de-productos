import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";

import MyAccountScreen from "../screens/Account/MyAccount";
import LoginScreen from "../screens/Account/Login";
import RegisterScreen from "../screens/Account/Register";
import Register_two_Screen from "../screens/Account/Register_two";

import SettingsScreen from "../screens/Account/Settings";
import StoresScreen from "../screens/Account/Stores";
import AppPreferencesScreen from "../screens/Account/AppPreferences";
import AboutScreen from "../screens/Account/About";

// const width = 155;
// const height = 35;

const AccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      //   title: "My account",
      // headerTitleAlign: "center",
      //headerTransparent: false,
      headerShown: false,
    }),
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: () => ({
      // headerTitleAlign: "center",
      headerShown: false,
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Register_two: {
    screen: Register_two_Screen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },

  Settings: {
    screen: SettingsScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Stores: {
    screen: StoresScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  AppPreferences: {
    screen: AppPreferencesScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  About: {
    screen: AboutScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
});

export default AccountScreenStack;
