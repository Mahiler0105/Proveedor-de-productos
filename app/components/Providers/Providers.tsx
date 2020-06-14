import React, { useEffect, useState, useRef} from "react";
import {  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from "react-native";
import { Avatar } from "react-native-elements";
import { firebaseApp } from "../../utils/Firebase";
import Layout from "../../../constants/Layout";
import firebase from "firebase/app";
import "firebase/firestore";
import { Suppliers, All} from "../Supplier";
import LoadingFull from "../LoadingFull"

const db = firebase.firestore(firebaseApp);
const suppliers: Suppliers = {
  all: [],
};
function useIsMountedRef(){
    const isMountedRef = useRef(null);
    useEffect(() => {
      isMountedRef.current = true;
      return () => isMountedRef.current = false;
    });
    return isMountedRef;
  }

export default function Providers(props) {
  const { navigation } = props;
  const [ready, setReady] = useState(false);  
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    let cont = 0;
    let cant = 0;
    suppliers.all =[];

    if(isMountedRef.current){

        (async () => {          
            await db.collection("Proveedor").orderBy("nombre")
              .get().then((response) => {
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
    
        }
  });
  if (!ready) {
    return (
      <View style={{backgroundColor: 'pink', width: Layout.window.width, height: Layout.window.height/5}}>
        <LoadingFull isVisible={true} text={"Cargando proveedores..."}/>
      </View>
    )
    
  }
  else {
    return (  
    <>
      {suppliers.all.map((track, key) => (
          <Provider key={key.toString()} provider={track} navigation={navigation} />
      ))}
    </>    
    )
  }  
}

function Provider(props) {
  const { provider, navigation } = props;
  const { logo, nombre } = provider;  

  return (
    <TouchableOpacity style={styles.touch} onPress={() => {navigation.navigate("Products", { proveedor: provider });}}>
      {logo ? (
        <Avatar source={{ uri: logo }} rounded size={Layout.window.width/3-50} avatarStyle={styles.avatar}/>
      ) : (
          <ActivityIndicator color="#190976" size="large"
            style={{
              width: Layout.window.width / 3,
              height: Layout.window.height / 5,
            }}
          />
        )}     
      
      <Text style={{ textAlign: "center", fontSize: 17 }}> {nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
  touch:{
    //backgroundColor:'pink'
    //marginLeft: 20,
    //marginRight: 20,
    //marginTop: 17,
  },
  avatar:{
    padding: 2,
    width: Layout.window.width / 3 - 50,
    height: Layout.window.width / 3 - 50,
  }
});
