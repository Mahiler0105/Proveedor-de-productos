import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Header, Avatar, Button } from "react-native-elements";
import { ListItem } from "react-native-elements";

// import AccountOptions from "../../components/Account/AccountOptions";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import { withNavigation } from "react-navigation";

const db = firebase.firestore(firebaseApp);

const UserLogged = (props) => {
  const { navigation } = props;
  console.log(navigation);

  const [userInfo2, setUserInfo2] = useState({});

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser;
      console.log("NUEVO PE " + firebase.auth().currentUser.uid);
      setUserInfo(user);
    })();
  }, []);

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderUp navigation={navigation}></HeaderUp>
      <Options navigation={navigation}></Options>
    </View>
  );
};
export default withNavigation(UserLogged);

const HeaderUp = (props) => {
  const { navigation } = props;
  return (
    <View>
      <View style={styles.header2}>
        <Avatar
          size="large"
          rounded
          showAccessory
          icon={{ name: "user", type: "font-awesome" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
          {firebase.auth().currentUser.uid}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10 }}>
          {firebase.auth().currentUser.email}
        </Text>
      </View>
      <View>
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
};

const Options = (props) => {
  const { navigation } = props;
  return (
    <View>
      {list.map((item, i) => (
        <TouchableOpacity onPress={() => navigation.navigate(item.navigate)}>
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{ name: item.icon, type: item.type }}
            bottomDivider
            chevron
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const list = [
  {
    title: "Cuenta",
    icon: "account-edit",
    type: "material-community",
    navigate: "Settings",
  },
  {
    title: "Mis Tiendas",
    icon: "store",
    type: "font-awesome-5",
    navigate: "Stores",
  },
  {
    title: "Preferencias",
    icon: "ios-settings",
    type: "ionicon",
    navigate: "AppPreferences",
  },
  {
    title: "Acerca de",
    icon: "information",
    type: "material-community",
    navigate: "About",
  },
];

const styles = StyleSheet.create({
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
