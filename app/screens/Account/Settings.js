import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";

const Settings = (props) => {
  const { vendedor } = props.navigation.state.params;
  const { navigation } = props;
  console.log(vendedor);
  return (
    <View>
      <Back navigation={navigation}></Back>
    </View>
  );
};
export default Settings;
