import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import LoadingFull from "../../components/LoadingFull";
import Login from "./Login";
import UserLogged from "./UserLogged";

import * as firebase from "firebase";
const color = 'rgb(78,32,29)'
export default MyAccount = (props) => {
  const [login, setLogin] = useState(null);
  const { navigation } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
    //return <LoadingFull isVisible={true} text="Cargando" color={color}/>;
  }

  return login ? <UserLogged /> : <Login />;
};
