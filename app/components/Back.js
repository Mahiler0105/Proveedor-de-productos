import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Back = (props) =>{
    const {navigation, color} = props
    return(
        <TouchableOpacity
          style={{...styles.back, backgroundColor: color}}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="ios-arrow-round-back"
            size={32}
            color="#fff"
          ></Ionicons>
        </TouchableOpacity>
    );
}
export default Back

const styles = StyleSheet.create({
    back: {
      position: "absolute",
      top: 20,
      left: 20,
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000000
    },
  });