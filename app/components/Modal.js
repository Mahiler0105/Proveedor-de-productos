import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { back, isVisible, setIsVisible, children } = props;
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.7)"
      overlayBackgroundColor="transparent"
      overlayStyle={{ ...styles.overlay, borderColor: back ? back : "#000" }}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
    backgroundColor: "#fff",
    // borderColor: Colors.primaryColor,
    padding: 0,
    borderRadius: 20,
    borderWidth: 2,
  },
});
