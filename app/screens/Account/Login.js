import React, { useState, useEffect } from "react";
import { View, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { withNavigation } from "react-navigation";

import { Dimensions } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import Log from "../../components/Account/Log";
import Animated, { Easing } from "react-native-reanimated";
import LoadingFull from "../../components/LoadingFull";

const { width, height } = Dimensions.get("window");

const color = 'rgb(78,32,29)'
const Login = (props) => {
  const { navigation } = props;  

  return (
    <>
      <View style={{top: 0, left: 0, position:'absolute', height: height, width: width, zIndex:-1 }}>
        <Image source={require("../../../assets/back.png")} style={{ flex: 1, width: null, height: height}} />
      </View>
      <KeyboardAwareScrollView contentContainerStyle={{/*position: 'absolute',*/ backgroundColor: 'transparent', flex:1, /*width:width, height:height*/}} enableOnAndroid={true}>
        <Log navigation={navigation} />
      </KeyboardAwareScrollView>
    </>
  );
};
export default withNavigation(Login);
