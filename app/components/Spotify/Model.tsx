import { Dimensions } from "react-native";
import Constants from "expo-constants";

const { height } = Dimensions.get("window");
const φ = (1 + Math.sqrt(5)) / 2;

export const MIN_HEADER_HEIGHT = 45 + Constants.statusBarHeight;
export const MAX_HEADER_HEIGHT = height * 0.28;
export const HEADER_DELTA = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;

export interface Track {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Album {  
  artist: string;
  cover: string;
  tracks: Track[];
}