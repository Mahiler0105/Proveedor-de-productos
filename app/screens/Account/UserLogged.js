import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Header, Avatar, Button } from "react-native-elements";
import { ListItem } from "react-native-elements";
import LoadingFull from "../../components/LoadingFull";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

// import AccountOptions from "../../components/Account/AccountOptions";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

import { withNavigation } from "react-navigation";
import { Updates } from "expo";

const db = firebase.firestore(firebaseApp);

const UserLogged = (props) => {
  const { navigation } = props;
  const [ready, setReady] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [vendedor, setVendedor] = useState({});
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    (async () => {
      const user = firebase.auth().currentUser;
      setUserInfo(user);

      await db
        .collection("Vendedor")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
          setVendedor(doc.data());
        });
      setReady(true);
    })();
    setReloadData(false);
  }, [reloadData]);

  if (!ready) {
    return <LoadingFull isVisible={true} />;
  }

  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <HeaderUp
        navigation={navigation}
        userInfo={userInfo}
        setReloadData={setReloadData}
        vendedor={vendedor}
      ></HeaderUp>
      <Options navigation={navigation}></Options>
    </View>
  );
};
export default withNavigation(UserLogged);

const HeaderUp = (props) => {
  const [ready, setReady] = useState(false);
  const { navigation, userInfo, setReloadData, vendedor } = props;

  const cambiarAvatar = async () => {
    const resultPermision = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const resultPermisionCamera = resultPermision.permissions.cameraRoll.status;
    if (resultPermisionCamera === "denied") {
      console.log("permisos");
    } else {
      var result = await ImagePicker.launchImageLibraryAsync({
        allowEditing: true,
        aspect: [4, 3],
      });
    }
    if (result.cancelled) {
      console.log("cancelado");
    } else {
      cargarImagen(result.uri, userInfo.uid).then(() => {
        console.log("Imagen subida correctamente");
        cargarFotoUrl(userInfo.uid);
      });
    }
  };

  const cargarImagen = async (uri, id) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${id}`);
    return ref.put(blob);
  };

  const cargarFotoUrl = async (uid) => {
    await firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (result) => {
        const update = {
          photoURL: result,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setReloadData(true);
      });
  };
  useEffect(() => {
    setReady(true);
  });

  if (!ready) {
    return <LoadingFull isVisible={true} />;
  }

  return (
    <View>
      <View style={styles.header2}>
        <Avatar
          size="large"
          rounded
          showEditButton
          onEditPress={cambiarAvatar}
          source={{
            uri: userInfo.photoURL
              ? userInfo.photoURL
              : "https://api.adorable.io/avatars/266/abott@adorable.png",
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 10 }}>
          {vendedor.nombre == undefined
            ? ""
            : vendedor.nombre + " " + vendedor.apellidos}
        </Text>
        <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10 }}>
          {firebase.auth().currentUser.email}
        </Text>
      </View>
      <View>
       
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
