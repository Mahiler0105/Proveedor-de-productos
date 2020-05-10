import * as React from "react";
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from "react-native";

export const BUTTON_HEIGHT = 30;
export const BUTTON_WIDTH = "auto";

export default () => (
  <TouchableWithoutFeedback>
    <View style={styles.button}>
      <Text style={styles.label}>PRODUCTOS</Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#190976",
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 32,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
});
