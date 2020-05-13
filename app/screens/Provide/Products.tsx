import React from "react";
import Back from "../../components/Back";
import Dots from "../../components/Dots"
import { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import LoadingFull from "../../components/LoadingFull"
import Album from "../../components/Spotify/Album";
import { Album as AlbumModel, Track } from "../../components/Spotify/Model";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const Settings = (props) => {    
    const { navigation } = props;
    const { id, name, logo, cover } = props.navigation.state.params.proveedor;
    const [ready, setReady] = useState(false);
    const [banner, setBanner] = useState(null);
    album.artist = name;
    album.cover = cover;
    
    useEffect(() => {
        (async () => {
            await db
                .collection("Producto")
                .where("Proveedor", "==", id)
                .get()
                .then((response) => {
                  
                    response.forEach((doc) => {                      
                        const temp: Track = {
                          name: doc.data().Nombre,
                          description: doc.data().Descripcion,
                          price: doc.data().Precio,
                          image: doc.data().imagen,
                      }
                      album.tracks.push(temp);      
                    });                  
                })                      
                .catch((error) => console.log("Error" + error));
                
        })();
        setReady(true);
        
    }, []);
    
    if (!ready) {
      return <LoadingFull isVisible={true} text={"Cargando productos"}/>;
    }
        return (
        <>
            <Back navigation={navigation}></Back>
            <Dots navigation={navigation}></Dots>
            <StatusBar barStyle="light-content" />
            <Album {...{ album }} />
        </>
    );
};
export default Settings;

const album: AlbumModel = {
  artist: "",
  cover: "",
  tracks: [],
}
