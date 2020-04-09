import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";

import MyAccountScreen from "../screens/Account/MyAccount";

// const width = 155;
// const height = 35;

const AccountScreenStack = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "My account",
      // headerTitleAlign: "center",
      //headerTransparent: false,
      // headerShown: false
    }),
  },
});

export default AccountScreenStack;
