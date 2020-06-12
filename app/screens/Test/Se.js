import React from 'react';
import {TouchableOpacity} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from "react-navigation";

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Test/HomeScreen';
import DetailsScreen from '../Test/DetailsScreen';
import ExploreScreen from '../Test/ExploreScreen';
import ProfileScreen from '../Test/ProfileScreen';

const size = 23;
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: (props) => ({
      title:'Overview',
      headerStyle:{
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontWeight: 'bold'
      },
      headerShown: true,
      headerLeft:()=>(
        <TouchableOpacity onPress={()=> props.navigation.openDrawer()}>
          <Icon name="ios-menu" size={25} backgroundColor="#009387"></Icon>
        </TouchableOpacity>
      )
    }),    
  }
});
const DetailsStack = createStackNavigator({
  Details: {
    screen: DetailsScreen,
    navigationOptions: (props) => ({
      title:'Details',
      headerStyle:{
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle:{
        fontWeight: 'bold'
      },
      headerShown: true,
      headerLeft:()=>(
        <TouchableOpacity onPress={()=> props.navigation.openDrawer()}>
          <Icon name="ios-menu" size={25} backgroundColor="#1f65ff"></Icon>
        </TouchableOpacity>
        )
    }),    
  }
});

const Tab = createMaterialBottomTabNavigator({
  Home:{
    screen: HomeStack,
    navigationOptions: () => ({
      tabBarLabel: "Home",
      tabBarColor: "#009387",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={size} color={tintColor} />
      ),
    }),
  },
  Notifications:{
    screen: DetailsStack,
    navigationOptions: () => ({
      tabBarLabel: "Updates",
      tabBarColor: "#1f65ff",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-notifications" size={size} color={tintColor} />
      ),
    }),
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions: () => ({
      tabBarLabel: "Profile",
      tabBarColor: "#694fad",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" size={size} color={tintColor} />
      ),
    }),
  },
  Explore:{
    screen: ExploreScreen,
    navigationOptions: () => ({
      tabBarLabel: "Explore",
      tabBarColor: "#d02860",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-aperture" size={size} color={tintColor} />
      ),
    }),
  }
},{
  initialRouteName: 'Home',
  activeColor: '#fff'
})
export default createAppContainer(Tab);