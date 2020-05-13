import React from "react";
import { Image, Icon } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import Colors from "../../constants/Colors";

import ProviderScreen from "../screens/Provide/Providers";
import ProductScreen from "../screens/Provide/Products";
import InfoProviderScreen from "../screens/Provide/InfoProvide";

import { RadialGradient } from "expo-linear-gradient";

// const width = 155;
// const height = 35;

const ProvideScreenStack = createStackNavigator({
  Providers: {
    screen: ProviderScreen,
    navigationOptions: () => ({
      title: "Proveedores",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: 'rgb(0,6,36)',
      },      
      
      headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
  Products: {
    screen: ProductScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.proveedor.nombre,     
      headerTransparent: false,
      headerShown: false,
    }),
  },
  InfoProviders: {
    screen: InfoProviderScreen,
    navigationOptions: () => ({
      title: "Informacion proveedor",
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: 'rgb(0,6,36)',
      }, 
      headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
 
})
export default ProvideScreenStack;
