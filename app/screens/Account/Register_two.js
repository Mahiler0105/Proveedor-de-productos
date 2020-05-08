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

import RegisterForm_two from "../../components/Account/RegisterForm_two";
import Colors from "../../../constants/Colors";
import Back from "../../components/Back";

export default function Register(props) {
  const { navigation } = props;

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Image
          source={require("../../../assets/logo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Back navigation={navigation}></Back>
        <View style={styles.viewForm}>
          <RegisterForm_two navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 220,
    marginTop: 50,
  },
  viewForm: {
    marginRight: 25,
    marginLeft: 25,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
  },
});
