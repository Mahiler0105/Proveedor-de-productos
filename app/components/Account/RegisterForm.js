import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import Colors from "../../../constants/Colors";

export default function RegisterForm(props) {
  const { navigation } = props;
  console.log(navigation);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  function handleNext() {
    navigation.navigate("Register_two", {
      name,
      lastName,
      phone,
    });
  }
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Nombres completos"
        placeholderTextColor={Colors.secundaryColor}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.inputContainer}
        selectionColor={Colors.secundaryColor}
        onChange={(e) => setName(e.nativeEvent.text)}
        leftplaceholderTextColor={Colors.secundaryColor}
        leftIconContainerStyle={styles.leftIconContainer}
        leftIcon={
          <Icon
            type="material-community"
            name="account-circle"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Apellidos completos"
        placeholderTextColor={Colors.secundaryColor}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.inputContainer}
        selectionColor={Colors.secundaryColor}
        onChange={(e) => setLastName(e.nativeEvent.text)}
        leftplaceholderTextColor={Colors.secundaryColor}
        leftIconContainerStyle={styles.leftIconContainer}
        leftIcon={
          <Icon
            type="material-community"
            name="account-circle"
            iconStyle={styles.iconRight}
          />
        }
      />

      <View
        style={{
          marginTop: 10,
          width: "100%",
        }}
      >
        <Input
          maxLength={9}
          keyboardType="number-pad"
          placeholder="Celular"
          placeholderTextColor={Colors.secundaryColor}
          containerStyle={{
            width: 200,
            paddingLeft: 10,
          }}
          inputContainerStyle={styles.inputContainer}
          selectionColor={Colors.secundaryColor}
          onChange={(e) => setPhone(e.nativeEvent.text)}
          leftplaceholderTextColor={Colors.secundaryColor}
          leftIconContainerStyle={styles.leftIconContainer}
          leftIcon={
            <Icon
              type="material-community"
              name="phone"
              iconStyle={styles.iconRight}
            />
          }
        />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "flex-end",
        }}
      >
        <Button
          title="Siguiente"
          containerStyle={styles.btnContainerRegister}
          disabled={name && lastName && phone ? false : true}
          buttonStyle={styles.btnRegister}
          onPress={() => {
            navigation.navigate("Register_two", {
              name,
              lastName,
              phone,
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 15,
  },
  inputContainer: {
    borderColor: Colors.secundaryColor,
    borderBottomWidth: 2,
    borderWidth: 2,
    borderRadius: 20,
    paddingRight: 10,
  },
  iconRight: {
    color: Colors.secundaryColor,
  },
  leftIconContainer: {
    backgroundColor: Colors.primaryColor,
    marginRight: 5,
    borderRightWidth: 2,
    borderRightColor: Colors.secundaryColor,
    marginLeft: 0,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
    padding: 4,
  },
  btnContainerRegister: {
    marginTop: 50,
    width: "40%",
    marginRight: 15,
  },
  btnRegister: {
    backgroundColor: Colors.secundaryColor,
    borderRadius: 20,
  },
  error: {
    fontSize: 15,
    fontWeight: "bold",
    //backgroundColor: "#c2c2c2",
    textAlign: "center",
    marginBottom: 0,
  },
});
