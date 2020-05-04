import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Header, Avatar, Button } from "react-native-elements";

// import AccountOptions from "../../components/Account/AccountOptions";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function UserLogged(props) {
  // const [userInfo, setUserInfo] = useState({});
  const [userInfo2, setUserInfo2] = useState({});
  const { navigation } = props;

  //   useEffect(() => {
  //     db.collection("users")
  //       .doc(firebase.auth().currentUser.uid)
  //       .get()
  //       .then((doc) => {
  //         // console.log("jjajajaj");
  //         setUserInfo2(doc.data());
  //       });
  //   }, []);

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser;
      console.log("NUEVO PE " + firebase.auth().currentUser.uid);
      setUserInfo(user);
    })();
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <View style={styles.header2}>
        <Avatar
          size="large"
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
          NUEVO USUARIO
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10 }}>
          {firebase.auth().currentUser.email}
        </Text>
      </View>
      <View style={styles.container}>
        {/* <AccountOptions navigation={navigation} /> */}
        <Button
          title="Cerrar Sesión"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnSignOut}
          containerStyle={styles.containerBtnSO}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  btnSignOut: {
    backgroundColor: "#190976",
  },
  containerBtnSO: {
    marginTop: 40,
  },
  header2: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 180,
  },
});
