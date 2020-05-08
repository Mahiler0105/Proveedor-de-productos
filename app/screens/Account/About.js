import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";

const About = (props) =>{
  const {navigation} = props    
  return (
    
    <View>
      <Back navigation={navigation}></Back>
      <Text>Estas en la pantalla Acerca de</Text>
    </View>
  );
}
export default About
