import { createStackNavigator } from "react-navigation-stack";

import ProviderScreen from "../screens/Provide/Providers";
import ProductScreen from "../screens/Provide/Products";
import InfoProviderScreen from "../screens/Provide/InfoProvide";

const Providers = createStackNavigator({
  Providers: {
    screen: ProviderScreen,
    navigationOptions: () => ({
      headerShown: false,
    }),
  },
  Products: {
    screen: ProductScreen,
    navigationOptions: (props) => ({
      //title: props.navigation.state.params.proveedor.nombre,     
      //headerTransparent: false,
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
export default Providers;
