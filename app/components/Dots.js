import React from 'react'
import { Icon } from "react-native-elements";
import {StyleSheet, TouchableOpacity, TouchableHighlight} from "react-native";
import Colors from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default (props)=>{
    const {color, modal} = props
return(
          
    <TouchableOpacity
        style={{...styles.info, backgroundColor: color}}
        onPress={() => {modal(true)}}
    >
        <MaterialCommunityIcons
            name="dots-vertical"
            size={25}
            color="#fff"
        />
    </TouchableOpacity>    
)
}
const styles = StyleSheet.create({
     info: {
      position: "absolute",
      top: 20,
      right: 20,
      width: 32,
      height: 32,
      borderRadius: 16,      
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10000000
    },
  });

