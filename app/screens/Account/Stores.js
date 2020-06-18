import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Back from "../../components/Back";
import Main from "../../components/Store/Main"

const Stores = (props) =>{
  const {navigation} = props
  console.log(props)
  return (
    <View style={styles.container}>      
      <View>
        <Back navigation={navigation}></Back>
        <Main />        
      </View>
    </View>   
  );
}
export default Stores

const styles = StyleSheet.create({
  container: {
    zIndex: 0, 
    backgroundColor: 'transparent', 
    width: '100%', 
    flex: 1, 
    flexDirection: 'column' 
  }
});