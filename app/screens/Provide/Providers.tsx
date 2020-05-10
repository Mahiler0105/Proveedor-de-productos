import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { Image, Avatar } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import Layout from "../../../constants/Layout";
import firebase from "firebase/app";
import "firebase/firestore";
import {Suppliers, All} from "../../components/Supplier";

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
            
            const temp: All = {
                id: doc.id,
                name: doc.data().nombre,
                logo: doc.data().logo,
                cover: doc.data().cover
              }
              suppliers.all.push(temp) 
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
  
  return (
    <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    }}
    ><View style={styles.container}>
      {
        suppliers.all.map((track) => (
          <Provide provider={track} navigation={navigation} />
        ))
      }    

    </View>
        
    </View>
  );
}

function Provide(props) {
  const { provider, navigation } = props;
  const { id, logo, nombre } = provider;
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
        navigation.navigate("Products", { proveedor: provider });
      }}
    >
      <Avatar
        source={{ uri: image }}
        rounded
        size="xlarge"
        avatarStyle={{
          padding: 2,
          width: Layout.window.width / 2 - 50,
          height: Layout.window.width / 2 - 50,
        }}
      />
      <Text style={{ textAlign: "center", fontSize: 17 }}> {nombre}</Text>
    </TouchableOpacity>
  );
}

const suppliers: Suppliers = {
  all: []
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
  },
  container: {
    marginLeft: 15,
    marginRight: 15, 
    width: "100%",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start' ,
    
  },
  item: {
    width: '50%',
    backgroundColor: "yellow",
    zIndex: 100000000
  }
});