import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function Products(props) {
  const { nombre, id } = props.navigation.state.params.proveedor;
  const [producto, setProducto] = useState([]);

  useEffect(() => {
    (async () => {
      const resultProduct = [];
      const products = await db
        .collection("Producto")
        .where("Proveedor", "==", id)
        .get()
        .then((response) => {
          response.forEach((doc) => {
            let producto = doc.data();
            producto.id = doc.id;
            resultProduct.push({ producto });
          });
          setProducto(resultProduct);
        })
        .catch((error) => console.log("Error" + error));
    })();
  }, []);

  return (
    <View>
      <FlatList
        renderToHardwareTextureAndroid={true}
        data={producto}
        renderItem={(product) => <Producto product={product} />}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginLeft: 15, marginRight: 15 }}
      />
    </View>
  );
}

function Producto(props) {
  const { product } = props;
  const { Descripcion, Nombre, Precio, imagen } = product.item.producto;
  const [images, setImages] = useState(null);
  console.log(product);

  useEffect(() => {
    firebase
      .storage()
      .ref(imagen)
      .getDownloadURL()
      .then((result) => {
        console.log(result);
        setImages(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "space-around",
        marginTop: 15,
        backgroundColor: "#f0615a",
        padding: 6,
        borderRadius: 10,
        // shadowColor: "#ff",
        // shadowRadius: 5,
        // shadowOpacity: 1,
      }}
    >
      {images ? (
        <Image
          source={{ uri: images }}
          style={{ width: 105, height: 105, borderRadius: 10 }}
        />
      ) : (
        <ActivityIndicator
          color="#190976"
          size="large"
          style={{ width: 105, height: 105 }}
        />
      )}
      <View style={{ marginLeft: 15, flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 20, color: "#190976", fontWeight: "bold" }}>
          {Descripcion}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#fff",
            marginBottom: 15,
          }}
        >
          {Nombre}
        </Text>
        <View
          style={{
            marginTop: 7,
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            S/. {Precio}0
          </Text>

          <Button
            iconContainerStyle={{ backgroundColor: "#ff3" }}
            iconRight
            icon={
              <Icon
                type="material-community"
                name="basket"
                size={16}
                color="#fff"
              />
            }
            titleStyle={{ fontSize: 10, marginRight: 5, fontWeight: "bold" }}
            title="AGREGAR A"
            buttonStyle={{ backgroundColor: "#190976", borderRadius: 5 }}
            containerStyle={{ width: "51%" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
