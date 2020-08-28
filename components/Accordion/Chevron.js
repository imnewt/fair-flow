import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import { mix } from "react-native-redash";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#383838"
  }
});

const Chevron = ({ transition }) => {
  const rotateZ = mix(transition, Math.PI, 0);
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }] }]}
    >
      <Ionicons name="ios-arrow-down-outline" color="white" size={24} />
    </Animated.View>
  )
}

export default Chevron;