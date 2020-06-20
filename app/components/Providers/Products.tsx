import React from "react";
import { useState, useEffect } from "react";
import LoadingFull from "../LoadingFull"
import Album from "../Spotify/Album";
import { Album as AlbumModel, Track } from "../Spotify/Model";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);
const album: AlbumModel = {
    artist: "",
    cover: "",
    tracks: [],
  }

const Products = (props) => {    
    const { navigation } = props;
    const { cover, id, name } = props.navigation.state.params.proveedor;
    const [ready, setReady] = useState(false);  

    useEffect(()=>{
        let mounted = true;
        let cont = 0;
        let cant = 0;
        album.artist = name;
        album.cover = cover;
        album.tracks =[];

        if (mounted){

            firebase.storage().ref(cover).getDownloadURL().then( function(result) {        
                album.cover=result                  
            }).catch(function(error) {
                console.log("Error: " + error);
            });  
        
            db
            .collection("Producto")
            .where("Proveedor", "==", id).orderBy('Nombre')
            .get()
            .then((response) => {   
                cant = response.docs.length;                
                if (cant==0){
                    setReady(true)
                }else{
                    response.forEach((doc) => {                                     
                        const temp: Track = {
                            name: doc.data().Nombre,
                            description: doc.data().Descripcion,
                            price: doc.data().Precio,
                            image: doc.data().imagen,
                        }                  
                        album.tracks.push(temp)                    
                    });                
                                
                    let tr=album.tracks                
                    cont=0
    
                    for (let a = 0; a < tr.length; a++) {
                        firebase.storage().ref(tr[a].image).getDownloadURL().then(function (result) {
                            tr[a].image = result
                            cont++                            
                            if (cont == cant) {
                                setReady(true)
                            }
                        }).catch(function (error) {
                            console.log("EEEEE" + error);
                        });
                    }
                }
            })                      
            .catch((error) => console.log("Error" + error));     
        
        }
        
    return()=>mounted =false
    },[]);    
    
    if (!ready) {
      return <LoadingFull isVisible={true} text={"Cargando productos"}/>;
    }
    return (<><Album {...{ album }} /></>);
};
export default Products;