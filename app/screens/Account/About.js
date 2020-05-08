import React, { cloneElement } from "react";
import Back from "../../components/Back";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import Layout from "../../../constants/Layout";
import { Button, Icon } from "react-native-elements";

import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import ProductSet from "../../components/Cover/ProductSet";
import { SetProducts as SetProductsModel} from "../../components/Cover/Model";

import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";


const db = firebase.firestore(firebaseApp);

const About = (props) =>{
  const {navigation} = props
  const { nombre, cover, id } = props.navigation.state.params.proveedor;
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
      <>
        <Back navigation={navigation}></Back>
        <StatusBar barStyle="light-content" />
        
        
        <View>
          <FlatList
            renderToHardwareTextureAndroid={true}
            data={producto}
            renderItem={(product) => <Producto product={product} />}
            keyExtractor={(item, index) => index.toString()}
            style={{ marginLeft: 15, marginRight: 15 }}
          />
        </View>
      </>      
    );
}
export default About
/*<ProductSet {...{ producto }} />*/



function Producto(props) {
  const { product } = props;
  const { nombre, cover, id } = props.navigation.state.params.proveedor;
  const { Descripcion, Nombre, Precio, imagen } = product.item.producto;
  const [images, setImages] = useState(null);

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

  console.log(nombre+ "  " + cover+ "  " + id);  
  console.log(Descripcion+ "  " + Nombre+ "  " + Precio+ "  " + imagen);  

  const set: SetProductsModel = {
    brand: nombre,
    cover: cover,
    track: [
      { 
        name: Nombre,
        description: Descripcion,
        price: Precio,
        image: imagen
    },
    ],
  };

  console.log(set);  
  return (
    <></>
  );
}







