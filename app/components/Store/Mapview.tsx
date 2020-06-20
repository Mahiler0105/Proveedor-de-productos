import React, {useState} from 'react'
import MapView, {LatLng, Marker} from 'react-native-maps';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-elements'
import Layout from '../../../constants/Layout'
let height = Layout.window.height
const ViewMap = (props) =>{
    const {all, color, places, index, title, hide, children, address, save} = props
    let lat, long;
    
    const initial = {
        latitude: -16.4009238,
        longitude: -71.5382064,
        latitudeDelta: 0.08,
        longitudeDelta: 0.081,
    }
    if (places.length==0){
        lat = initial.latitude
        long = initial.longitude
    } else {
        lat = places[index].dire.latitude
        long = places[index].dire.longitude
    }
    const retrieved = {
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.04,
        longitudeDelta: 0.05,
    }    
    const m : LatLng = {
        latitude: retrieved.latitude,
        longitude: retrieved.longitude,       
    }
    const [mark, setMark] = useState(m)
   
    return(
        <>
            <View style={{ height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                <Text style={{ fontSize: 24 }}>{all?title:"Ubique el punto exacto de su tienda"}</Text>
            </View>
            {children}
            <View style={{borderColor: color, borderWidth: 2, height: height/2, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <MapView style={{...StyleSheet.absoluteFillObject}} initialRegion={all?initial:retrieved} onPress={(e)=>{setMark(e.nativeEvent.coordinate)}}>
                    {all?(
                        places.map((store, key) => (
                            <Marker key={key.toString()} coordinate={store.dire} title={store.name} description={store.cont}/>
                        ))
                    ):(<>
                        <Marker draggable coordinate={mark} onDragEnd={(e) => {setMark(e.nativeEvent.coordinate)}}
                            title={places.length==0?"Nueva tienda":places[index].name} 
                            description={places.length==0?"Nueva descripcion":places[index].desc} />
                    </>)}                    
                </MapView>               
            </View>

            {all?(<></>):(
                <View style={{height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>                
                    <Button buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="Guardar" type="clear" 
                            onPress={()=>{save(mark);hide(false)}}/>
                    <Button buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="Cancelar" type="clear" 
                            onPress={()=>{hide(false)}} />                             
                </View>   
            )}
                    
        </>
    )
}
export default ViewMap