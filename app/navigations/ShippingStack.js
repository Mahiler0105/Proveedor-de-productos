import React from "react";
import { Image } from "react-native-elements";
import Colors from "../../constants/Colors";
import { createStackNavigator } from "react-navigation-stack";

import ShippingScreen from "../screens/Shipping/Shipping";
// const width = 155;
// const height = 35;

const ShippingScreenStack = createStackNavigator({
  Providers: {
    screen: ShippingScreen,
    navigationOptions: () => ({
      title: "Envios",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: 'rgb(0,6,36)',
      }, 
      // headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
});

export default ShippingScreenStack;
