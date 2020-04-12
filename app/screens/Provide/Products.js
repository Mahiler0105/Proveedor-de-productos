import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
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
        marginTop: 10,
        backgroundColor: "#f0615a",
        padding: 15,
        borderRadius: 20,
      }}
    >
      <Image
        source={{ uri: images }}
        style={{ width: 160, height: 160, borderRadius: 20 }}
      />
      <View style={{ marginLeft: 15 }}>
        <Text style={{ fontSize: 27, color: "#190976", fontWeight: "bold" }}>
          {Descripcion}
        </Text>
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
          {Nombre}
        </Text>
        <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
          S/.{Precio}
        </Text>

        <Button
          iconContainerStyle={{ backgroundColor: "#ff3" }}
          icon={
            <Icon
              type="material-community"
              name="basket"
              size={25}
              color="white"
            />
          }
          iconRight
          //TouchableComponent={<TouchableOpacity></TouchableOpacity>}
          titleStyle={{ fontSize: 14, marginRight: 8 }}
          title="Agregar carrito"
          buttonStyle={{ backgroundColor: "#190976", borderRadius: 10 }}
          containerStyle={{ marginTop: 10, width: 160 }}
        />
      </View>
    </TouchableOpacity>
  );
}
