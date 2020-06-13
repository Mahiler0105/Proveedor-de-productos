import { createStackNavigator } from "react-navigation-stack";
import ShippingScreen from "../screens/Shipping/Shipping";

const Shipping = createStackNavigator({
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

export default Shipping;
