import { createStackNavigator } from "react-navigation-stack";
import CartScreen from "../screens/Cart/Cart";

const Cart = createStackNavigator({
  Cart: {
    screen: CartScreen,
    navigationOptions: () => ({
      headerShown: false      
    }),
  },
});

export default Cart;
