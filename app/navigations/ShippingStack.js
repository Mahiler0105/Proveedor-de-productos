import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";

import ShippingScreen from "../screens/Shipping/Shipping";
// const width = 155;
// const height = 35;

const ShippingScreenStack = createStackNavigator({
  Providers: {
    screen: ShippingScreen,
    navigationOptions: () => ({
      title: "Envios",
      // headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
});

export default ShippingScreenStack;