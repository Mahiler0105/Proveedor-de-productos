import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import Layout from "../../../constants/Layout";
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
        marginTop: 12,
        backgroundColor: "#f0615a",
        padding: 7,
        borderRadius: 10,
        height: Layout.window.height / 4.5,
        // shadowColor: "#ff",
        // shadowRadius: 5,
        // shadowOpacity: 1,
      }}
    >
      {images ? (
        <Image
          source={{ uri: images }}
          style={{
            width: Layout.window.width / 3,
            height: Layout.window.height / 5,
            borderRadius: 12,
          }}
        />
      ) : (
        <ActivityIndicator
          color="#190976"
          size="large"
          style={{
            width: Layout.window.width / 3,
            height: Layout.window.height / 5,
          }}
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
        <Text
          style={{
            fontSize: 14,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          S/. {Precio}0 x docena
        </Text>
        <View
          style={{
            marginTop: 15,
            // marginBottom: 5,
            flex: 1,
            // backgroundColor: "#ffaa",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            titleStyle={{
              fontSize: 10,
              color: "#fff",
              fontWeight: "bold",
            }}
            title="AGREGAR A CARRITO"
            buttonStyle={{
              width: 165,
              marginRight: 5,
              borderRadius: 5,
              backgroundColor: "#190976",
            }}
          />
          <Button
            iconRight
            icon={
              <Icon
                type="material-community"
                name="share-variant"
                size={16}
                color="#fff"
              />
            }
            titleStyle={{
              fontSize: 10,
              color: "#190976",
              fontWeight: "bold",
            }}
            title=""
            buttonStyle={{
              width: 40,
              borderRadius: 5,
              backgroundColor: "#190976",
              margin: 0,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
