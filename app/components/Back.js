import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const Back = (props) =>{
    const {navigation} = props
    return(
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
      backgroundColor: Colors.primaryColor,
      alignItems: "center",
      justifyContent: "center",
    },
  });