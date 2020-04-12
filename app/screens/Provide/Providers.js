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
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Providers() {
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

  return <ListProvider proveedor={proveedor} />;
}

function ListProvider(props) {
  const { proveedor } = props;
  const numero = 2;
  return (
    <View>
      <FlatList
        renderToHardwareTextureAndroid={true}
        data={proveedor}
        renderItem={(provider) => <Provide provider={provider} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numero}
        style={{ marginLeft: 15, marginRight: 15 }}
      />
    </View>
  );
}

function Provide(props) {
  const { provider } = props;
  const { id, logo, nombre } = provider.item.proveedor;
  const [image, setImage] = useState(null);

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

  // console.log("NO MAMES" + proveedor.id);

  return (
    <TouchableOpacity
      style={{ margin: 20 }}
      onPress={() => {
        console.log("PRESIONAME");
      }}
    >
      <Avatar
        source={{ uri: image }}
        rounded
        size="xlarge"
        // style={{ width: 160, height: 160 }}

        // PlaceholderContent={<ActivityIndicator />}
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
