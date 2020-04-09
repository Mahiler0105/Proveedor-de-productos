import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import Loading from "../../components/Loading";

import * as firebase from "firebase";

export default MyAccount = (props) => {
  const [login, setLogin] = useState(null);
  const { navigation } = props;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    return <Loading isVisible={true} text="Cargando" />;
  }

  return login ? (
    <View>
      <Text>Usuario Logueado</Text>
    </View>
  ) : (
    <View>
      <Text>Logeate perro</Text>
    </View>
  );
};
