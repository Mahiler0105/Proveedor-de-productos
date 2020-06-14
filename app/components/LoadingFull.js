import { Dimensions } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

import Colors from "../../constants/Colors";
const { height, width } = Dimensions.get("window");

export default (props) => {
  const { isVisible, text } = props;
  return (
    <View isVisible={isVisible} style={{...styles.view}}>
        <ActivityIndicator size={70} color={Colors.activeTabColor} />
        {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: Colors.primaryColor,
    textTransform: "uppercase",
    marginTop: 10,
  },
});

