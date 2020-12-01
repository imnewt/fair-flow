import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import LinearGradient from "react-native-linear-gradient"

import TasksScreen from "../screens/Tasks"

const TasksStack = createStackNavigator();

export default function TasksStackScreen() {
  return (
    <TasksStack.Navigator 
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
      <TasksStack.Screen name="Tasks" component={TasksScreen} options={{ headerShown: false }}/>
    </TasksStack.Navigator>
  )
}