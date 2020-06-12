import React, { useEffect, useState } from "react";
import {  View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Avatar } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import Layout from "../../../constants/Layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { Suppliers, All } from "../../components/Supplier";
import { LinearGradient } from "expo-linear-gradient";
import LoadingFull from "../../components/LoadingFull"

const db = firebase.firestore(firebaseApp);
const suppliers: Suppliers = {
  all: [],
};

export default function Providers(props) {
  const { navigation } = props;
  const [ready, setReady] = useState(false);  

  useEffect(() => {
    let cont = 0;
    let cant = 0;
    suppliers.all =[];
    (async () => {     
      
      await db
        .collection("Proveedor")
        .get()
        .then((response) => {
          cant = response.docs.length;

          response.forEach((doc) => {
            const temp: All = {
              id: doc.id,
              name: doc.data().nombre,
              logo: doc.data().logo,
              cover: doc.data().cover,
            };
            suppliers.all.push(temp);
          });
          
          console.log(suppliers);
          let all = suppliers.all;
          for(let a=0;a<all.length;a++){
            firebase.storage().ref(all[a].logo).getDownloadURL().then(function (result) {             
              cont++      
              all[a].logo = result;   
              console.log(cont)    
              if (cont == cant) {
                setReady(true)
              }         
            }).catch(function (error) {
              console.log("EEEEE" + error);
            }); 
          }
        })
        .catch((error) => console.log("Error" + error));
    })();
  }, []);
  if (!ready) {
    return <LoadingFull isVisible={true} text={"Cargando proveedores..."}/>;
  }
  else {
    return (    
      <LinearGradient style={StyleSheet.absoluteFill} start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }} locations={[0, 0.5]} colors={["#51616f", "#272d33"]} >
      <View style={styles.super}>
        <View style={styles.container}>
          {suppliers.all.map((track, key) => (
            <Provider key={key.toString()} provider={track} navigation={navigation} />
          ))}
        </View>
      </View>
    </LinearGradient>
    )
  }  
}

function Provider(props) {
  const { provider, navigation } = props;
  const { logo, nombre } = provider;  

  return (
    <TouchableOpacity style={styles.touch} onPress={() => {navigation.navigate("Products", { proveedor: provider });}}>
      <Avatar source={{ uri: logo }} rounded size="xlarge" avatarStyle={styles.avatar}/>
      <Text style={{ textAlign: "center", fontSize: 17 }}> {nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 50,
  },
  super:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  container: {
    marginLeft: 15,
    marginRight: 15,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    width: "50%",
    backgroundColor: "yellow",
    zIndex: 100000000,
  },
  touch:{
    marginLeft: 20,
    marginRight: 20,
    marginTop: 17,
  },
  avatar:{
    padding: 2,
    width: Layout.window.width / 2 - 50,
    height: Layout.window.width / 2 - 50,
  }
});
