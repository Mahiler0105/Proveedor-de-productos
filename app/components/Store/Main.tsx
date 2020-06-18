import React, {useState, Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, FlatList} from "react-native";
import {Icon, Input, Button} from 'react-native-elements'
import Layout from "../../../constants/Layout"
import {Locals} from './Store'
import Modal from '../Modal'
import MapView, { Marker, LatLng } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';


let width = Layout.window.width
let height = Layout.window.height
const color = 'rgb(78,32,29)'
const locals: Locals = {
    ini: [{
        id: 1,
        icon: "plus",
        type: "material-community",
    }],
    all: [{
        id: 1,
        icon: "ios-home",
        type: "ionicon",
        name: "Primera tienda",
        cont: "Primer contacto",
        cell: "+51 123",
        dire: {
            latitude: -16.4009238,
            longitude: -71.5382064,
            }
    },{
        id: 1,
        icon: "ios-home",
        type: "ionicon",
        name: "Segunda tienda",
        cont: "Segundo contacto",
        cell: "+51 456",
        dire: {
            latitude: -16.38639,
            longitude: -71.54,
            }
    },{
        id: 1,
        icon: "ios-home",
        type: "ionicon",
        name: "Tercer tienda",
        cont: "Tercer contacto",
        cell: "+51 789",
        dire: {
            latitude: -16.3928334,
            longitude: -71.5672382,
            }
    }]
  }
const iconsavailable =[
{icon: "drive-eta"},
{icon: "headset"},
{icon: "laptop"},
{icon: "music-note"},]

const Del = (props)=>{
    const {e, d} = props
    console.log(e)
    return(
        <>
            <View style={{ height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                <Text style={{ fontSize: 24 }}>¿Desea eliminar esta tienda?</Text>
            </View>
            <View style={{height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                <Button onPress={()=>{e(false); d(false)}} buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="Si" type="clear" />
                <Button onPress={()=>{d(false)}} buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="No" type="clear" />
            </View>            
            
        </>
    )
}
const Map = (props)=>{
    const {all} = props
    const initial = {
        latitude: -16.4009238,
        longitude: -71.5382064,
        latitudeDelta: 0.08,
        longitudeDelta: 0.081,
        }
    const m : LatLng = {
        latitude: initial.latitude,
        longitude: initial.longitude,       
    }
    const [mark, setMark] = useState(m)
    return(
        <>
            <View style={{ height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                <Text style={{ fontSize: 24 }}>{all?"Mis tiendas":"Ubique la direccion de su tienda"}</Text>
            </View>
            <View style={{borderColor: color, borderWidth: 2, height: 400, width: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
                <MapView style={{...StyleSheet.absoluteFillObject}} initialRegion={initial} onPress={(e)=>{setMark(e.nativeEvent.coordinate)}}>
                    {all?(
                        locals.all.map((store, key) => (
                            <Marker key={key.toString()} coordinate={store.dire} title={store.name} />
                        ))
                    ):(<>
                        <Marker draggable coordinate={mark} title={'Mi tienda'} onDragEnd={(e) => {setMark(e.nativeEvent.coordinate)}}/>
                    </>)}
                    
            </MapView>

            <Text style={{ fontSize: 24 }}>{mark.latitude}</Text>
            <Text style={{ fontSize: 24 }}>{mark.longitude}</Text>
            </View>

            {all?(<></>):(
                <View style={{height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>                
                    <Button buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="Guardar" type="clear" />
                    <Button buttonStyle={{paddingLeft: 50, paddingRight: 50}} title="Cancelar" type="clear" />                             
                </View>   
            )}
                    
        </>
    )
}
const Seticons =(props)=>{    
    const {setnum, num, ind, name} = props
    let len = iconsavailable.length
    return(
        <TouchableOpacity style={{marginRight:(ind+1)%len==0?0:5}} onPress={()=>{setnum(ind)}}>            
            <View style={{zIndex: 99999, width: '100%', 
            borderWidth:2,            
            borderColor: num==ind?color:'rgba(189, 187, 178, 0.3)',
            padding: 10}}>
                <Icon name={name} size={34} color={num==ind?color:'rgba(189, 187, 178, 0.3)'} />
            </View> 
        </TouchableOpacity>
    )
}
const Children = (props)=>{
    const {ind, data, edit, e, m, viewall} = props
    const [num, setNum] = useState(0)    
    const [del, setDel] = useState(false)
   
    return(
        <>
            <View style={{ marginBottom: 5, height: 52, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                <Text style={{ fontSize: 24 }}>{edit ? "Editar tienda":"Añadir nueva tienda"}</Text>
                {edit? (
                    <TouchableOpacity style={{marginLeft:25}} onPress={()=>{setDel(true)}}>
                        <Icon color= {color} size={25} name='trash-can' type={'material-community'}></Icon>
                    </TouchableOpacity>  
                ) : (<></>)}
            </View>
            <Input value={edit?data[ind].name:""} placeholder='Nombre del local' leftIcon={<Icon name='store' type='material' size={24} color={color} />} />
            <Input value={edit?data[ind].cont:""} placeholder='Persona de contacto' leftIcon={<Icon name='person' type='material' size={24} color={color} />} />
            <Input value={edit?data[ind].cell:""} placeholder='Celular' leftIcon={<Icon name='phone' type='material' size={24} color={color} />} />
                        
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:10, marginBottom:10 }}>
                <Icon name='add-location' type='material' size={24} color={color} />
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginRight: 10}}>Dirección</Text>
                <TouchableOpacity onPress={()=>{m(true);viewall(false)}}>
                    <Text style={{color: '#245c9c'}}>Seleccione en el mapa</Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:10, marginBottom:10 }}>
                <Icon name='insert-emoticon' type='material' size={24} color={color} />
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Icono para su tienda</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FlatList data={iconsavailable}  
                horizontal                      
                keyExtractor={(item, index) => 'key' + index}                
                renderItem={({ item, index })=> <Seticons ind={index} name={item.icon} num={num} setnum={setNum} ></Seticons>}
                windowSize={10}/>
            </View>
            <Button title="Guardar" type="clear" />
            
            <Modal isVisible={del} setIsVisible={setDel} children={<Del e={e} d={setDel}/>} back={'#fff'}></Modal>
        </>
    )
}
const MainStore = (props) =>{    
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const [map, setMap] = useState(false);
    const [view, setView] = useState(false);
    const [ind, setInd] = useState(0);
    const {navigation} = props
    
    return (  
        <SafeAreaView style={{ }}><ScrollView>        
        <View style={styles.super}>
            <View style={styles.container}>
            
            <View style={{marginBottom: 5, height: 52, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 24}}>Mis Tiendas</Text>
            </View>

            <TouchableOpacity style={{marginRight: 5, marginBottom:5,borderRadius: 20}} onPress={()=>{setVisible(true);setEdit(false)}}>
                <View style={{...styles.store, borderRadius: 20}}>
                    <Icon color={color} size={100} name={locals.ini[0].icon} type={locals.ini[0].type}></Icon>                         
                </View>
            </TouchableOpacity>
            
            {locals.all.map((store, key) => (
                <Storefill key={key} ind={key} store={store} navigation={navigation} e={setEdit} v={setVisible} s={setInd}/>
            ))}             
            </View>
            {locals.all.length>1?(
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop:10, marginBottom:10 }}>
                <TouchableOpacity onPress={()=>{setMap(true);setView(true)}}>
                    <Icon name='add-location' type='material' size={24} color={color} />
                    <Text style={{color: '#245c9c'}}>Ver mapa de mis tiendas</Text>
                </TouchableOpacity>
            </View>
            ):(<></>)}           

            <Modal isVisible={visible} setIsVisible={setVisible} children={<Children ind={ind} data={locals.all} edit={edit} e={setVisible} m={setMap} viewall={setView}/>} back={'#fff'}></Modal>
            <Modal isVisible={map} setIsVisible={setMap} children={<Map all={view}/>} back={'#fff'}></Modal>
        </View>
        </ScrollView></SafeAreaView> 
     )
}
export default MainStore

const Storefill = (props) => {
    const {s, e, v, ind, store} = props
    
    return (
        <TouchableOpacity style={(ind+1)%2==0 ? {marginBottom:5,marginRight:5}:{marginBottom:5,marginRight:0}} onPress={()=>{v(true);e(true);s(ind)}}>
            <View style={{...styles.store}}>
                <Icon color={color} size={100} name={store.icon} type={store.type}></Icon>
                <Text style={{textAlign: "center", fontSize: 17, color: 'black'}}>Tienda {ind+1}</Text>  
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    super: {
        alignItems: "center", justifyContent: "center", width: width, height: height, padding: 10
    },
    container: {        
        marginLeft: 15, marginRight: 15, width: "100%", flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" },
    child: {
        flexDirection: 'row', zIndex: 10000, flexWrap: "wrap", alignItems: "flex-start",
    },
    store: {
        borderColor: color, borderWidth: 2, width: (width - 25) / 2, height: (width - 25) / 2, 
        borderRadius: 20, justifyContent:'center', alignItems:'center'
    }
})