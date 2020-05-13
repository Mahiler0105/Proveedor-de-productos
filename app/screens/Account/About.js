import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import Back from "../../components/Back";
import { Button } from "react-native-paper";

const About = (props) => {
  const { navigation } = props;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        paddingTop: 60,
      }}
    >
      <Back navigation={navigation}></Back>
      <View
        style={{
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../../assets/ucsmIcon.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 15 }}>
          Universidad Católica de Santa María {"\n"}
        </Text>
        <Text>Desarrollado por:{"\n"}</Text>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          Fernando Mahiler Chullo Mamani{"\n"}
          Benjamin Andre Valdivia Navarrete {"\n"}
          Gianella Nahomi Alvarez Tinajeros{"\n"}
          Gabriel Alejandro Catacora Llerena{"\n"}
        </Text>
        <Text> Arequipa - Perú </Text>
        <Text> 2020</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          margin: 10,
        }}
      >
        <Text style={{ color: "#c2c2c2" }}>Versión de la App: 1.0</Text>
        <Button
          title="Agregar"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnSignOut}
          containerStyle={styles.containerBtnSO}
        />
      </View>
    </View>
  );
};
export default About;

const styles = StyleSheet.create({
  logo: {
    marginRight: 150,
    width: "35%",
    margin: 0,
    height: 150,
  },
});
