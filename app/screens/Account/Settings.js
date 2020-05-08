import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";

const Settings = (props) =>{
    const {navigation} = props
    return (
        <View>
            <Back navigation={navigation}></Back>
        <Text>Estas en la pantalla de Configuracion de Cuen</Text>
        </View>
    );
}
export default Settings
