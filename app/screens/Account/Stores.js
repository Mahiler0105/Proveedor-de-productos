import React from "react";
import { StyleSheet } from "react-native";
import Back from "../../components/Back";
import Main from "../../components/Store/Main";
import Layout from '../../../constants/Layout';
let height = Layout.window.height
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const color = 'rgb(78,32,29)'

const Stores = (props) =>{
  const {navigation} = props 

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled={true} enableOnAndroid={true} >
        <Back navigation={navigation} color={color}></Back>
        <Main />        
     </KeyboardAwareScrollView>
  );
}
export default Stores

const styles = StyleSheet.create({
  container: {
    zIndex: 0, 
    backgroundColor: 'transparent', 
    width: '100%', 
    //height: height-100,    
    flexDirection: 'column' 
  }
});