import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Image, Avatar } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import Layout from "../../../constants/Layout";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export default function Providers(props) {
  const { navigation } = props;
  const [proveedor, setProveedor] = useState([]);

  useEffect(() => {
    (async () => {
      const resultProvider = [];
      const proveedores = await db
        .collection("Proveedor")
        .get()
        .then((response) => {
          response.forEach((doc) => {
            let proveedor = doc.data();
            proveedor.id = doc.id;
            resultProvider.push({ proveedor });
          });
          setProveedor(resultProvider);
        })
        .catch((error) => console.log("Error" + error));
    })();
  }, []);
  return <ListProvider proveedor={proveedor} navigation={navigation} />;
}

function ListProvider(props) {
  const { proveedor, navigation } = props;
  const numero = 2;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      }}
    >
      <FlatList
        renderToHardwareTextureAndroid={true}
        data={proveedor}
        renderItem={(provider) => (
          <Provide provider={provider} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numero}
        style={{
          width: "100%",
        }}
      />
    </View>
  );
}

function Provide(props) {
  const { provider, navigation } = props;
  const { id, logo, nombre } = provider.item.proveedor;
  const [image, setImage] = useState(null);
  console.log(navigation);

  useEffect(() => {
    firebase
      .storage()
      .ref(logo)
      .getDownloadURL()
      .then((result) => {
        console.log(result);

        setImage(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(id + "  " + nombre + "  " + logo);
  return (
    <TouchableOpacity
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 17,
      }}
      onPress={() => {
        navigation.navigate("Products", { proveedor: provider.item.proveedor });
      }}
    >
      <Avatar
        source={{ uri: image }}
        rounded
        size="xlarge"
        style={{
          padding: 2,
          width: Layout.window.width / 2 - 50,
          height: Layout.window.width / 2 - 50,
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 17 }}> {nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
  },
});
