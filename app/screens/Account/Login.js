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

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const color = 'rgb(78,32,29)'
const Login = (props) => {
  const { navigation } = props;
  const [ready, setReady] = useState(false);

  

  if (!ready) {
    return (
      <>
      <AppLoading
        startAsync={async () => {
          const imageAssets = cacheImages([
            require("../../../assets/logo.png"),
          ]);
          await Promise.all([...imageAssets]);
        }}
        onFinish={setReady(true)}
        onError={console.warn}
      >        
      </AppLoading>
      <LoadingFull isVisible={true} color={color} />
      </>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, height: height - 15 }}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <Animated.View style={{ height: height - 15 }}>
            <Image
              source={require("../../../assets/logo.png")}
              style={{ flex: 1, width: null, height: height, marginTop: -20 }}
            />
          </Animated.View>

          <Log navigation={navigation} />
        </KeyboardAwareScrollView>
      </ScrollView>
    </View>
  );
};

export default withNavigation(Login);
