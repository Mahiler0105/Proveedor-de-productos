import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { Input } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterForm from "../../components/Account/RegisterForm";
import Colors from "../../../constants/Colors";

export default function Register(props) {
  const { navigation } = props;
  console.log("hola pe", props);

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Image
          source={require("../../../assets/login.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#190976"
          ></Ionicons>
        </TouchableOpacity>
        <View style={styles.viewForm}>
          <RegisterForm navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 250,
    marginTop: 30,
  },
  viewForm: {
    marginRight: 25,
    marginLeft: 25,
  },
  back: {
    position: "absolute",
    top: 40,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
