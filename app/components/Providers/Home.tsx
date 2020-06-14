import React from "react";
import {  View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList} from "react-native";
import {Icon} from 'react-native-elements'
import Layout from "../../../constants/Layout";
import { Category } from "../Supplier";
import Carousel from '../Carrousel/Carrousel'
import { offers } from '../Carrousel/Offers'
import Providers from './Providers'
let width = Layout.window.width;
let height = Layout.window.height;

export default function Home(props) {
  const { navigation } = props;
  
  return (         
    <View style={styles.super}>
      <View style={styles.container}>
        <View style={styles.child}>
          <Carousel data={offers} />
        </View>
        <View style={{...styles.child, marginTop: 30, marginHorizontal: 10}}>
          <View style={styles.section}>
            <Text style={styles.secTitle}>Categorias destacadas</Text>
            <View style={styles.secIcon}>
              <Text style={{fontSize:15, fontWeight: 'bold', color: 'white'}}>Todas</Text>
              <Icon color= '#fff' style={{justifyContent:'flex-end', fontSize: 15}} name='chevron-right' type="material-community"></Icon>
            </View>                  
          </View>
          <FlatList data={categories.all}                        
            keyExtractor={(item, index) => 'key' + index}
            horizontal
            pagingEnabled                        
            snapToAlignment="center"
            scrollEventThrottle={16}                        
            showsHorizontalScrollIndicator={false}
            renderItem={({ item })=> <Categories item={item}/>}
            windowSize={10}
            style =  {{ width:Layout.window.width-20}}                        
          />
        </View>
        <View style={{...styles.child, marginTop: 10, marginHorizontal: 10}}>
          <View style={styles.section}>
            <Text style={styles.secTitle}>Proveedores destacados</Text>                            
          </View>
          
          <Providers navigation={navigation}></Providers>
        </View>
      </View>
    </View>      
  )
}  

const Categories = ({ item }) => {
  return(
  <TouchableOpacity 
    style={{height:50, width: (width-20)/4, justifyContent:'center', alignItems:'center'}} 
    key={item.id.toString()} 
   >
    <Icon color="#fff" style={{fontSize:30}} name={item.icon} type={item.type}></Icon>
    <Text style={{color: 'white'}}>{item.name}</Text>
  </TouchableOpacity>
  )
}
const categories: Category = {
  all: [{
    id: "1",
    name: "Bebidas",
    type: "material-community",
    icon: "bottle-wine",    
  },{
    id: "2",
    name: "Abarrotes",
    type: "material-icons",
    icon: "local-grocery-store",    
  },{
    id: "3",
    name: "Panaderia",
    type: "material-community",
    icon: "bread-slice-outline",    
  },{
    id: "4",
    name: "Limpieza",
    type: "material-community",
    icon: "broom",    
  }]
}
const styles = StyleSheet.create({
  super:{
    alignItems: "center",
    justifyContent: "center",
    //padding: 10,
  },
  container: {    
    marginLeft: 15,
    marginRight: 15,
    width: "100%",
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },  
  child:{
    flexDirection: 'row',
    zIndex: 10000,
    flexWrap: "wrap",
    alignItems: "flex-start",
   
  },
  section:{
    width:'100%', flexDirection: 'row', alignItems:'center', marginBottom: 10
  },
  secTitle:{
    width:(0.66*width)-10, fontSize:23, fontWeight: 'bold', color: 'white'
  },
  secIcon:{
    width: (0.33*width)-10, justifyContent:'flex-end', flexDirection:'row', alignItems: 'center'
  }
  
});
