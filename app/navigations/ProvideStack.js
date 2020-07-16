import { createStackNavigator } from "react-navigation-stack";

import ProviderScreen from "../screens/Provide/Home";
import ProductScreen from "../screens/Provide/Products";
import BotScreen from "../screens/Provide/Bot";

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
  ChatBot: {
    screen: BotScreen,
    navigationOptions: (props) => ({
      //title: props.navigation.state.params.proveedor.nombre,
      //headerTransparent: false,
      headerShown: false,
    }),
  },
});
export default Providers;
