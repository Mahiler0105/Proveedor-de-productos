import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import Colors from "../../constants/Colors";

import ProviderScreen from "../screens/Provide/Providers";
// const width = 155;
// const height = 35;

const ProvideScreenStack = createStackNavigator({
  Providers: {
    screen: ProviderScreen,
    navigationOptions: () => ({
      title: "Proveedores",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: Colors.secundaryColor,
      },
      
      // headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
});

export default ProvideScreenStack;
