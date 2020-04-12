import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";

import ProviderScreen from "../screens/Provide/Providers";
// const width = 155;
// const height = 35;

const ProvideScreenStack = createStackNavigator({
  Providers: {
    screen: ProviderScreen,
    navigationOptions: () => ({
      title: "Proveedores",
      // headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
});

export default ProvideScreenStack;
