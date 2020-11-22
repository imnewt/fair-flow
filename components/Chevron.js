import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import { mix } from "react-native-redash";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from "react-native";

const styles = EStyleSheet.create({
  container: {
    height: "7.5rem",
    width: "7.5rem",
    borderRadius: "3.75rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#2ea7e0"
  }
})

const size = Dimensions.get("window").width / 100 * 5

const Chevron = ({ transition }) => {
  const rotateZ = mix(transition, Math.PI, 0);
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }] }]}
    >
      <Ionicons name="ios-arrow-down-outline" color="white" size={size} />
    </Animated.View>
  )
}

export default Chevron;