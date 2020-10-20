import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import LoginScreen from "./screens/Login"
import FeedStackScreen from "./navigation/Feed"
import LibraryStackScreen from "./navigation/Library"
import FavoritesStackScreen from "./navigation/Favorites"
import SettingsStackScreen from "./navigation/Settings"

import Ionicons from "react-native-vector-icons/Ionicons"
import EStyleSheet from 'react-native-extended-stylesheet'
import { Dimensions } from 'react-native'; 

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 100});

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = "md-home";
          } else if (route.name === "Library") {
            iconName = "ios-bookmarks";
          } else if (route.name === "Favorites") {
            iconName = "ios-heart";
          } else if (route.name === "Settings") {
              iconName = "ios-settings";
          }
          return <Ionicons name={iconName} size={25} color={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: "#FCFCF2",
        inactiveTintColor: "#8D8E91",
        style: { 
          backgroundColor: "#383838",
          height:60,
          paddingBottom:3
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true
      }}
      
    >
      <Tab.Screen name="Feed" component={FeedStackScreen}/>
      <Tab.Screen name="Library" component={LibraryStackScreen}/>
      <Tab.Screen name="Favorites" component={FavoritesStackScreen}/>
      <Tab.Screen name="Settings" component={SettingsStackScreen}/>
    </Tab.Navigator>
  )
}

const RootStack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerTitle: null,
          headerTransparent: true,
          headerTintColor: "#36413E",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 19,
            color: "#FFF"
          },
          headerBackImage: () => <Ionicons name="ios-arrow-back" size={25}/>
        }}
      >
        <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <RootStack.Screen name="Main" component={Main} options={{ headerShown: false }} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

