import React, { Component } from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import Home from "../../components/Providers/Home";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "react-native-elements";
import Modal from "../../components/Modal";
import { Video } from "expo-av";

class App extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.navigation = navigation;
    // this.modal = true;
  }
  state = {
    search: "",
    searchBarFocused: false,
    modal: true,
  };

  updateSearch = (search) => {
    this.setState({ search });
  };
  setModal = (modal) => {
    this.setState({ modal });
  };

  render() {
    const { search } = this.state;

    return (
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5]}
        colors={["#51616f", "#272d33"]}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.container}>
              <View
                style={{
                  backgroundColor: "#c45653",
                  justifyContent: "center",
                  paddingHorizontal: 0,
                }}
              >
                <SearchBar
                  placeholder="Buscar proveedor.."
                  onChangeText={this.updateSearch}
                  value={search}
                />
              </View>
              <View>
                <Home navigation={this.navigation}></Home>
                <Modal
                  isVisible={this.state.modal}
                  setIsVisible={this.setModal}
                  children={
                    <Video
                      source={{
                        uri:
                          "https://firebasestorage.googleapis.com/v0/b/lrtbl-6858b.appspot.com/o/videos%2FLerietbool%2C%201%20entrega.mp4?alt=media&token=8ebcdf65-c516-4e15-9e91-ed1303e994b9",
                      }}
                      rate={1.0}
                      volume={1.0}
                      isMuted={false}
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                      style={{ width: 369, height: 355, borderRadius: 18 }}
                    />
                  }
                  back={"rgb(78,32,29)"}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    flexDirection: "column",
  },
});
