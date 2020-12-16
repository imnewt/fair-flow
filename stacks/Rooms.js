import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import LinearGradient from "react-native-linear-gradient"

import RoomsScreen from "../screens/Rooms"
import RoomDetailScreen from "../screens/RoomDetail"

const RoomsStack = createStackNavigator();

export default function RoomsStackScreen() {
  return (
    <RoomsStack.Navigator 
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
      <RoomsStack.Screen name="Rooms" component={RoomsScreen} options={{ headerShown: false }}/>
      <RoomsStack.Screen name="RoomDetail" component={RoomDetailScreen} options={{ headerShown: false }}/>
    </RoomsStack.Navigator>
  )
}