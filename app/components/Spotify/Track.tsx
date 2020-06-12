import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Layout from "../../../constants/Layout";
import { Button } from "react-native-elements";
import { Feather as Icon } from "@expo/vector-icons";
import { Track } from "./Model";

interface TrackProps {
  track: Track;
  a: (j: boolean) => void;
  b: (j: any) => void;
}

export default ({ track, a, b }: TrackProps) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "space-around",
          marginTop: 12,
          backgroundColor: "#f0615a",
          padding: 7,
          borderRadius: 10,
          height: Layout.window.height / 4.5,
        }}
      >
        {track.image ? (
          <Image
            source={{ uri: track.image }}
            style={{
              width: Layout.window.width / 3,
              height: Layout.window.height / 5,
              borderRadius: 12,
            }}
          />
        ) : (
          <ActivityIndicator
            color="#190976"
            size="large"
            style={{
              width: Layout.window.width / 3,
              height: Layout.window.height / 5,
            }}
          />
        )}
        <View style={{ marginLeft: 15, flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 20, color: "#190976", fontWeight: "bold" }}>
            {track.description}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              marginBottom: 15,
            }}
          >
            {track.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            S/. {track.price}0 x docena
          </Text>
          <View
            style={{
              marginTop: 15,
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              titleStyle={{
                fontSize: 10,
                color: "#fff",
                fontWeight: "bold",
              }}
              onPress={() => {
                console.log("press");
                b(track);
                a(true);
              }}
              title="AGREGAR A CARRITO"
              buttonStyle={{
                width: 165,
                marginRight: 5,
                borderRadius: 5,
                backgroundColor: "#190976",
              }}
            />
            <Button
              iconRight
              // disabled
              icon={
                <Icon
                  type="material-community"
                  name="share-variant"
                  size={16}
                  color="#fff"
                />
              }
              titleStyle={{
                fontSize: 10,
                color: "#190976",
                fontWeight: "bold",
              }}
              title=""
              buttonStyle={{
                width: 40,
                borderRadius: 5,
                backgroundColor: "#190976",
                margin: 0,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row",
    backgroundColor: "black",
  },
  cell: {
    padding: 16,
    justifyContent: "center",
  },
  index: {
    color: "#b2b3b4",
  },
  artist: {
    color: "#b2b3b4",
  },
  name: {
    color: "white",
  },
});
