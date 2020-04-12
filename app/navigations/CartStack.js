import React from "react";
import { Image } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import Colors from "../../constants/Colors";
import CartScreen from "../screens/Cart/Cart";
// const width = 155;
// const height = 35;

const CartScreenStack = createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: () => ({
      title: "Carrito",
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

export default CartScreenStack;
