import React from "react";
import { Icon } from "react-native-elements";

import Colors from "../../constants/Colors";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import AccountScreenStack from "./AccountStack";
import ProviderScreenStack from "./ProvideStack";
import CartScreenStack from "./CartStack";
import ShippingStack from "./ShippingStack";

const size = 23;
const NavigationStacks = createMaterialBottomTabNavigator(
  {
    Account: {
      screen: AccountScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Cuenta",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="account"
            size={size}
            color={tintColor}
          />
        ),
      }),
    },
    Provider: {
      screen: ProviderScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Proveedores",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="truck"
            size={size}
            color={tintColor}
          />
        ),
      }),
    },
    Cart: {
      screen: CartScreenStack,
      navigationOptions: () => ({
        tabBarLabel: "Carrito",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="cart"
            size={size}
            color={tintColor}
          />
        ),
      }),
    },
    Shipping: {
      screen: ShippingStack,
      navigationOptions: () => ({
        tabBarLabel: "Envios",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            type="material-community"
            name="package"
            size={size}
            color={tintColor}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: "Provider",
    order: ["Provider", "Shipping", "Cart", "Account"],
    activeColor: Colors.activeTabColor,
    inactiveColor: Colors.inactiveTabColor,
    barStyle: { backgroundColor: Colors.backgroundTabColor },
  }
);

export default createAppContainer(NavigationStacks);
