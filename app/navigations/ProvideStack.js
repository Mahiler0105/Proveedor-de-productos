import React from "react";
import { Image, Icon } from "react-native-elements";

import { createStackNavigator } from "react-navigation-stack";
import Colors from "../../constants/Colors";

import ProviderScreen from "../screens/Provide/Providers";
import ProductScreen from "../screens/Provide/Testing";
import InfoProviderScreen from "../screens/Provide/InfoProvide";



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
    screen: ProductScreen,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.proveedor.nombre,
      /*headerTintColor: "#fff",
      headerRight: () => (
        <Icon
          type="material-community"
          name="dots-vertical"
          size={25}
          color="#fff"
          onPress={() => {
            props.navigation.navigate("InfoProviders", {
              proveedor: props.navigation.state.params.proveedor,
            });
          }}
        />
      ),
      headerRightContainerStyle: { marginRight: 10 },
      headerStyle: {
        backgroundColor: Colors.secundaryColor,
      },*/
      headerTitleAlign: "center",
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
        backgroundColor: Colors.secundaryColor,
      },
      headerTitleAlign: "center",
      //headerTransparent: false,
      //   headerShown: false,
    }),
  },
 
})
export default ProvideScreenStack;
