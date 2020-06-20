import React from "react";
import Back from "../../components/Back";
import Dots from "../../components/Dots"
import { useState } from "react";
import { StatusBar, View } from "react-native";
import LoadingFull from "../../components/LoadingFull"
import Album from "../../components/Spotify/Album";
import { Album as AlbumModel, Track } from "../../components/Spotify/Model";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import {Text, Icon} from 'react-native-elements'
import Products from '../../components/Providers/Products'
import Modal from '../../components/Modal'
import Mapview from '../../components/Store/Mapview'
import {Info} from '../../components/Store/Store'

const color='rgb(0,6,36)';

const locals:Info = {
    all: [{
        id: 1,        
        name: "Primer Local",
        cont: "Contacto de proveedor",        
        cell: "+51 123",
        dire: {
            latitude: -16.4009238,
            longitude: -71.5382064,
            }
    },{
        id: 2,        
        name: "Segundo Local",
        cont: "Contacto de proveedor",        
        cell: "+51 123",
        dire: {
            latitude: -16.3909238,
            longitude: -71.5382064,
            }
    }]
  }
const Children = (props) =>{
    return(
    <>
        {locals.all.map((local, key)=>(
            <View key={key.toString()} style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom:10, borderBottomColor: color, borderBottomWidth:1 }}>
                <Icon name='location-pin' type='entypo' size={24} color={color} />
                <Text style={{ fontSize: 15, fontWeight: 'bold'}}>Sucursal: </Text>                
                <Text style={{color: '#245c9c'}}>{local.name}</Text>  

                <Icon name='phone' type='material' size={24} color={color} />
                <Text style={{ fontSize: 15, fontWeight: 'bold'}}>Celular: </Text>                
                <Text style={{color: '#245c9c'}}>{local.cell}</Text>                  
            </View>
        ))}        
    </>
    )
}

const MainProd = (props) =>{    
    const [info, setInfo] = useState(false)
    const { navigation } = props;    
    return (
        <>
            <Back navigation={navigation} color={color}></Back>
            <Dots modal={setInfo} color={color}></Dots>
            <StatusBar barStyle="light-content" />
            <Products navigation={navigation}/>

            <Modal isVisible={info} setIsVisible={setInfo} back={'#fff'}
            children={<Mapview all={true} color={color} places={locals.all} children={<Children />} title={"Informacion del Proveedor"}/>} ></Modal>
        </>
    );
}
export default MainProd;

/*const Products = (props) => {    
    
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
                console.log(cant)
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
            })                      
            .catch((error) => console.log("Error" + error));     
        
        }
        
    return()=>mounted =false
    },[]);
    
    
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
};*/



