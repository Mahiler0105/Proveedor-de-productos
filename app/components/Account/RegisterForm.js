import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Input, Icon, Button, CheckBox } from "react-native-elements";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import Colors from "../../../constants/Colors";

import Loading from "../Loading";

const db = firebase.firestore(firebaseApp);

export default function RegisterForm(props) {
  const { navigation } = props;
  // console.log(navigation);

  const [hidePassword, setHidePassword] = useState(true);
  const [hideRePassword, setHideRePassword] = useState(true);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const inputEmail = React.createRef();

  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const inputPassword = React.createRef();

  const [rePassword, setRePassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const inputRePassword = React.createRef();

  const [isVisibleLoading, setIsVisibleLoading] = useState(false);

  const [major, setMajor] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+51");

  useEffect(() => {
    if (errorEmail !== "") {
      inputEmail.current.shake();
    } else if (errorPassword !== "") {
      inputPassword.current.shake();
    } else if (errorRePassword !== "") {
      inputRePassword.current.shake();
    }
  }, [errorEmail, errorPassword]);

  const setStateError = () => {
    setErrorEmail("");
    setErrorPassword("");
    setErrorRePassword("");
  };

  const handleRegister = async () => {
    setIsVisibleLoading(true);
    setStateError();
    if (password !== rePassword) {
      setErrorRePassword("No coinciden las contraseñas");
      inputRePassword.current.shake();
    } else {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          navigation.navigate("MyAccount");
          // await db
          //   .collection("users")
          //   .doc(firebase.auth().currentUser.uid)
          //   .set({
          //     name: name,
          //     lastName: lastName,
          //     birthdate: firebase.firestore.Timestamp.fromDate(
          //       new Date("December 10, 1815")
          //     ),
          //     favoritePlaces: [],
          //     gender: "",
          //     createAt: new Date(),
          //   })
          //   .then(() => navigation.navigate("MyAccount"))
          //   .catch(() => console.log("ERROR"));
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/network-request-failed":
              Alert.alert(
                "Conexión no encontrada, vuelva a intentarlo o intentelo más tarde."
              );
              break;
            case "auth/invalid-email":
              setErrorEmail("Correo electronico invalido");
              break;
            case "auth/email-already-in-use":
              setErrorEmail("El correo ya existe");
              break;
            case "auth/weak-password":
              setErrorPassword("Debe tener más de 6 caracteres");
              break;
            default:
              break;
          }
        });
    }
    setIsVisibleLoading(false);
  };
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
      <Input
        ref={inputEmail}
        placeholder="Correo electronico"
        placeholderTextColor={Colors.secundaryColor}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.inputContainer}
        selectionColor={Colors.secundaryColor}
        onChange={(e) => setEmail(e.nativeEvent.text)}
        leftplaceholderTextColor={Colors.secundaryColor}
        leftIconContainerStyle={styles.leftIconContainer}
        errorMessage={errorEmail}
        errorStyle={styles.error}
        leftIcon={
          <Icon
            type="material-community"
            name="email"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        ref={inputPassword}
        placeholder="Contraseña"
        password={true}
        secureTextEntry={hidePassword}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.inputContainer}
        selectionColor={Colors.secundaryColor}
        placeholderTextColor={Colors.secundaryColor}
        onChange={(e) => setPassword(e.nativeEvent.text)}
        leftIconContainerStyle={styles.leftIconContainer}
        errorMessage={errorPassword}
        errorStyle={styles.error}
        leftIcon={
          <Icon
            type="material-community"
            name="lock"
            iconStyle={styles.iconRight}
          />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHidePassword(!hidePassword)}
          />
        }
      />
      <Input
        ref={inputRePassword}
        placeholder="Repetir Contraseña"
        password={true}
        secureTextEntry={hideRePassword}
        containerStyle={styles.inputForm}
        inputContainerStyle={styles.inputContainer}
        selectionColor={Colors.secundaryColor}
        placeholderTextColor={Colors.secundaryColor}
        onChange={(e) => setRePassword(e.nativeEvent.text)}
        leftIconContainerStyle={styles.leftIconContainer}
        errorMessage={errorRePassword}
        errorStyle={styles.error}
        leftIcon={
          <Icon
            type="material-community"
            name="lock"
            iconStyle={styles.iconRight}
          />
        }
        rightIcon={
          <Icon
            type="material-community"
            name={hideRePassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setHideRePassword(!hideRePassword)}
          />
        }
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
        }}
      >
        <Input
          defaultValue="+51"
          maxLength={9}
          keyboardType="number-pad"
          placeholder="Celular"
          placeholderTextColor={Colors.secundaryColor}
          containerStyle={{
            width: 200,
            paddingLeft: 15,
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
        <CheckBox
          title="Soy +18"
          checked={major}
          checkedColor={Colors.primaryColor}
          containerStyle={{
            borderWidth: 0,
            backgroundColor: "#fff",
            marginLeft: 0,
          }}
          onPress={() => setMajor(!major)}
        />
      </View>

      <Button
        title="Crear Cuenta"
        containerStyle={styles.btnContainerRegister}
        disabled={
          email &&
          password &&
          rePassword &&
          name &&
          lastName &&
          phone &&
          major === true
            ? false
            : true
        }
        buttonStyle={styles.btnRegister}
        onPress={handleRegister}
      />
      <Loading text="Creando cuenta" isVisible={isVisibleLoading} />
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
    marginTop: 15,
    width: "95%",
    marginBottom: 20,
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
