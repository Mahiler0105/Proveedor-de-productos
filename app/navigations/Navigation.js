import React from "react";
import { Icon } from "react-native-elements";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import Account from "./AccountStack";
import Providers from "./ProvideStack";
import Cart from "./CartStack";
import Shipping from "./ShippingStack";

const size = 23;
const Tab = createMaterialBottomTabNavigator({
  Home:{
    screen: Providers,
    navigationOptions: () => ({
      tabBarLabel: "Home",
      tabBarColor: 'rgb(0,6,36)',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material-community" name="truck" size={size} color={tintColor} />
      ),
    }),
  },
  Cart:{
    screen: Cart,
    navigationOptions: () => ({
      tabBarLabel: "Carrito",
      tabBarColor: "rgb(92,80,158)",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material-community" name="basket" size={size} color={tintColor} />
      ),
    }),
  },
  Shipping:{
    screen: Shipping,
    navigationOptions: () => ({
      tabBarLabel: "Envios",
      tabBarColor: "rgb(245,145,140)",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material-community" name="package" size={size} color={tintColor} />
      ),
    }),
  },
  Account:{
    screen: Account,
    navigationOptions: () => ({
      tabBarLabel: "Cuenta",
      tabBarColor: "rgb(78,32,29)",
      tabBarIcon: ({ tintColor }) => (
        <Icon type="material-community" name="account" size={size} color={tintColor} />
      ),
    }),
  }
},{
  initialRouteName: 'Home',  
  tabBarOptions: {
    style:{height:'50%'}
}, 
})
export default createAppContainer(Tab);
