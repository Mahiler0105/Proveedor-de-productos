import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

import Colors from "../../constants/Colors";
const { height, width } = Dimensions.get("window");

export default (props) => {
  const { w, color, isVisible, text } = props;
  return (
    <View isVisible={isVisible} style={{...styles.view, width: w?width-w:width}}>
        <ActivityIndicator size={70} color={color? color : Colors.activeTabColor} />
        {text && <Text style={{...styles.text, color: color?color:Colors.primaryColor}}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    height: height,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    textTransform: "uppercase",
    marginTop: 10,
  },
});

