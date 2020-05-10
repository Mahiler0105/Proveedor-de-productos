import * as React from "react";
import {
  Image, StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

import { useState, useEffect } from "react";
import { firebaseApp } from "../../utils/Firebase";
import firebase from "firebase/app";
import "firebase/firestore";

interface CoverProps {
  album: Album;
  y: Animated.Value<number>;
}

const { interpolate, Extrapolate } = Animated;

export default ({ album: { cover }, y }: CoverProps) => {
  const [image, setImage] = useState("");
  useEffect(()=>{
    firebase
      .storage()
      .ref(cover)
      .getDownloadURL()
      .then( (result) => {        
        setImage(result);
      })
      .catch((error) => {
        console.log("EEEEE" + error);
      });    
  },[])
 
  const scale: any = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, 0],
    outputRange: [4, 1],
    extrapolateRight: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-64, 0, HEADER_DELTA],
    outputRange: [0, 0.2, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
      <Image style={styles.image}  source={{uri: image,}}  />
      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, backgroundColor: "black", opacity }}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT ,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
