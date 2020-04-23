import React from "react";
import { Image, Icon } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import Colors from "../../constants/Colors";

import ProviderScreen from "../screens/Provide/Providers";
import ProductSreen from "../screens/Provide/Products";

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
      headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
  Products: {
    screen: ProductSreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.proveedor.nombre,
      headerTintColor: "#fff",
      headerRight: () => (
        <Icon
          type="material-community"
          name="dots-vertical"
          size={25}
          color="#fff"
        />
      ),
      headerRightContainerStyle: { marginRight: 10 },
      headerStyle: {
        backgroundColor: Colors.secundaryColor,
      },
      headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
});

export default ProvideScreenStack;
