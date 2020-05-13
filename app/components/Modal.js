import React from "react";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible, children } = props;
  const closeModal = () => setIsVisible(false);
  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,.7)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
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
    backgroundColor: Colors.secundaryColor,
    // borderColor: Colors.primaryColor,
    borderRadius: 10,
    borderWidth: 2,
  },
});
