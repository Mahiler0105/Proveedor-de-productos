import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";
import { Button } from "react-native-paper";

const About = (props) =>{
  const {navigation} = props
  return (
    <View>
      <Back navigation={navigation}></Back>
      <Text>Estas en la pantalla Agregar productos</Text>
      <Button
          title="Agregar"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnSignOut}
          containerStyle={styles.containerBtnSO}
        />
    </View>
  );
}

export default About