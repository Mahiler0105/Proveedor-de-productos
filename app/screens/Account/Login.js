import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { withNavigation } from "react-navigation";
import { Divider } from "react-native-elements";

import LoginForm from "../../components/Account/LoginForm";
import LoginFacebook from "../../components/Account/LoginFacebook";

import Colors from "../../../constants/Colors";

const Login = (props) => {
  const { navigation } = props;

  return (
    <ScrollView style={styles.contenedor}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <Image
          source={require("../../../assets/logo2.png")}
          resizeMode="contain"
          style={styles.logo}
        />
        <View style={styles.viewContainer}>
          <LoginForm navigation={navigation} />
          <CreateAccount navigation={navigation} />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.viewContainer}>
          <LoginFacebook />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const CreateAccount = (props) => {
  const { navigation } = props;
  console.log(navigation);

  return (
    <View style={styles.containerCreate}>
      <Text> ¿Aún no tienes cuenta? </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.btnRegister}>Registrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withNavigation(Login);

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: "100%",
    height: 250,
    marginTop: 40,
  },
  viewContainer: {
    marginRight: 25,
    marginLeft: 25,
  },
  divider: {
    backgroundColor: Colors.primaryColor,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 15,
    marginBottom: 10,
    height: 1,
  },
  btnRegister: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  containerCreate: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
});
