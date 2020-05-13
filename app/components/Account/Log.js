import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

import LoginForm from "./LoginForm";


const {  Value,  event,  block,  cond,  eq,  set,  Clock,  startClock,  stopClock,  debug,  timing,
  clockRunning,  interpolate,  concat, Extrapolate} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}
class Log extends Component {
  constructor(props) {
    super();
    const {navigation} = props
    this.navigation = navigation

    this.buttonOpacity = new Value(1);
    
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex= interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1,-1],
        extrapolate: Extrapolate.CLAMP
      });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
      });
      
    this.textInputY = interpolate(this.buttonOpacity, {
        inputRange: [0, 1],
        outputRange: [0, 100],
        extrapolate: Extrapolate.CLAMP
      });
      
    this.rotation = this.buttonOpacity.interpolate( {
        inputRange: [0, 1],
        outputRange: [180, 360],
        extrapolate: Extrapolate.CLAMP
      });
  }
  render() {
      console.log(this.navigation)
    return (

      <View style={{ ...StyleSheet.absoluteFill, top: height / 3 * 2, height: height / 3, justifyContent: 'center' }}>
        <TapGestureHandler onHandlerStateChange={this.onStateChange}>
          <Animated.View
            style={{
              ...styles.button,
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Iniciar Sesión</Text>
          </Animated.View>
        </TapGestureHandler>
        <View style={{ flexDirection: "row", marginHorizontal: 15 }}>
          <Animated.View
            style={{
              ...styles.button,
              width: width / 2 - 25,
              marginHorizontal: 5,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Ionicons
              name="logo-facebook"
              size={25}
              color={'#fff'}
            ></Ionicons>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>acebook</Text>
          </Animated.View>
          <Animated.View
            style={{
              ...styles.button,
              width: width / 2 - 25,
              marginHorizontal: 5,
              backgroundColor: '#fff',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Ionicons
              name="logo-google"
              size={25}
            ></Ionicons>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>oogle</Text>
          </Animated.View>
        </View>
        <Animated.View style={{
          zIndex: this.textInputZindex,
          opacity: this.textInputOpacity,
          transform: [{ translateY: this.textInputY }],
          height: height / 3,
          marginRight: 25,
          marginLeft: 25,
          ...StyleSheet.absoluteFill,
          justifyContent: 'center',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 2,
        }}>
          <TapGestureHandler onHandlerStateChange={this.onCloseState}>
            <Animated.View style={styles.close}>
              <Animated.Text style={{
                fontSize: 15,
                transform: [{ rotate: concat(this.rotation, 'deg') }]
              }}>X</Animated.Text>
            </Animated.View>
          </TapGestureHandler>

          <LoginForm navigation={this.navigation} />
          <View style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 5,
            marginBottom: 55
          }} >

            <Text> ¿Aún no tienes cuenta? </Text>
            <TouchableOpacity onPress={() => this.navigation.navigate("Register")}>
              <Text style={styles.btnRegister}>Registrate</Text>
            </TouchableOpacity>

          </View>
        </Animated.View>

      </View>
    );
  }
}
export default Log;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f0615a',
    height: 60,
    width: null,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: "black",
    shadowOffset: {width:5,height:5},
    shadowColor: 'black',
    shadowOpacity: 0.5
  },
  text: {
      height:50,
      borderRadius:25,
      borderWidth:5,
      marginHorizontal:20,
      paddingLeft: 10,
      marginVertical:5,
      borderColor:'rgba(0,0,0,0.2)'      
  },
  btnRegister: {
    color: Colors.primaryColor,
    fontWeight: "bold",
  },
  close:{
    height:40,
    width:40,
    backgroundColor: '#ececec',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "center",
    position: "absolute",
    top:-20,
    left: width/2-40,
    shadowOffset: {width:5, height:5},
    shadowColor:'black',
    shadowOpacity:0.5,
    shadowRadius: 5,
    borderColor: '#e0e0e0'

  }
  
});
