import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import RegisterForm from "../../components/Account/RegisterForm";
import Colors from "../../../constants/Colors";
import Back from "../../components/Back";

const { width, height } = Dimensions.get('window');


export default function Register(props) {
  const { navigation } = props;

  return (
    <ScrollView style={{ backgroundColor: "#fff", flex: 1 }}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={{height: height - 15}}>
          <Image source={require('../../../assets/logo.png')}
            style={{ flex: 1, width: null, height: height }}/>
        </View>
        <Back navigation={navigation}></Back>
        <View style={styles.viewForm}>
          <RegisterForm navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  viewForm: {
    ...StyleSheet.absoluteFill,
    marginRight: 25,
    marginLeft: 25,
    top: height/2,
  },
  
});
