import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"

import {View} from "react-native"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import CartIconWithBadge from "./components/CartIconWithBadge"

// import { CartProvider } from "./contexts/Cart"

const thu = () => {
  return <View/>
}

import FeedStackScreen from "./navigation/Feed"
import LibraryStackScreen from "./navigation/Library"
import FavoritesStackScreen from "./navigation/Favorites"
import SettingsStackScreen from "./navigation/Settings"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        {/* <Tab.Screen name="test" options={{
          // title: null,
          tabBarIcon: <Ionicons name="ios-add" size={20} color="red"/>,
          // tabBarLabel: null
          // tabBarButton: 
          
          
        }}
        // component={thu}
        /> */}
        <Tab.Screen name="Favorites" component={FavoritesStackScreen}/>
        <Tab.Screen name="Settings" component={SettingsStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}