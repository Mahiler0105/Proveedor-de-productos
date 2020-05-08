import React from "react";
import { View, Text } from "react-native";
import Back from "../../components/Back";

import { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import { StatusBar } from "react-native";
import { AppLoading } from "expo";
import Album from "../../components/Spotify/Album";
import { Album as AlbumModel } from "../../components/Spotify/Model";

const Settings = (props) => {
  const { navigation } = props;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      await Asset.loadAsync(album.cover);
      setReady(true);
    })();
  });
  if (!ready) {
    return <AppLoading />;
  }
  return (
    <>
      <Back navigation={navigation}></Back>
      <StatusBar barStyle="light-content" />
      <Album {...{ album }} />
    </>
  );
};
export default Settings;

const album: AlbumModel = {
  name: "Remote Control",
  artist: "Jan Blomqvist",
  release: 2016,
  // eslint-disable-next-line global-require
  cover: require("../../../assets/Jan-Blomqvist.jpg"),
  tracks: [
    { name: "Stories Over" },
    { name: "More", artist: "Jan Blomqvist, Elena Pitoulis" },
    { name: "Empty Floor" },
    { name: "Her Great Escape" },
    { name: "Dark Noise" },
    { name: "Drift", artist: "Jan Blomqvist, Aparde" },
    { name: "Same Mistake" },
    {
      name: "Dancing People Are Never Wrong",
      artist: "Jan Blomqvist, The Bianca Story",
    },
    { name: "Back in the Taxi" },
    { name: "Ghosttrack" },
    { name: "Just OK" },
    { name: "The End" },
  ],
};
