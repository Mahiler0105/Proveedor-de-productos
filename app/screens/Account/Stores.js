import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";

const Stores = (props) =>{
  const {navigation} = props
  return (
    <View>
      <Back navigation={navigation}></Back>
      <Text>Estas en la pantalla de Tiendas</Text>
    </View>
  );
}
export default Stores