import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import LinearGradient from "react-native-linear-gradient"

import SettingsScreen from "../screens/Settings"

const SettingsStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator 
    //   initialRouteName="Home" 
    //   screenOptions={{
    //     headerTitleAlign: "center",
    //     headerTitleStyle: {
    //       fontWeight: "bold",
    //       fontSize: 19,
    //       color: "#FFF"
    //     },
    //     headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
    //     headerBackground: () => <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={["#ff9966", "#ff5e62"]} style={{flex: 1}}/>
    //   }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
    </SettingsStack.Navigator>
  )
}