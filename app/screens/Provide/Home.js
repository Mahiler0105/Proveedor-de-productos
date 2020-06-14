import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView, ScrollView
} from "react-native";

import Home from '../../components/Providers/Home'
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from 'react-native-elements';

class App extends Component {
  constructor(props) {
    super(props);
    
    const {navigation} = props;
    this.navigation = navigation;
  }
  state = {
    search: '',
    searchBarFocused: false
  }; 

  updateSearch = search => {
    this.setState({ search });
  };
  
  render() {
    const { search } = this.state;
    return (

      <LinearGradient style={StyleSheet.absoluteFill} start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }} locations={[0, 0.5]} colors={["#51616f", "#272d33"]} >
        <SafeAreaView style={{ flex: 1 }}><ScrollView>

          <View style={styles.container}>
            <View style={{ backgroundColor: '#c45653', justifyContent: 'center', paddingHorizontal: 0 }}>
              <SearchBar
                placeholder="Buscar proveedor.."
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
            <View>
              <Home navigation={this.navigation}></Home>
            </View>
          </View>
        </ScrollView></SafeAreaView>
      </LinearGradient>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    zIndex: 0, 
    backgroundColor: 'transparent', 
    width: '100%', 
    flex: 1, 
    flexDirection: 'column' 
  }
});