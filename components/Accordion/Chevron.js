import React from "react";
import { StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import { mix, mixColor } from "react-native-redash";

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

export default ({ transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  const backgroundColor = mixColor(
    transition,
    { r: 82, g: 82, b: 81 },
    { r: 228, g: 86, b: 69 }
  )
  return (
    <Animated.View
      style={[styles.container, { transform: [{ rotateZ }] }]}
    >
      <Ionicons name="ios-arrow-down-outline" color="white" size={24} />
    </Animated.View>
  );
};
