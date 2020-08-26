import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const LIST_ITEM_HEIGHT = 156;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    borderColor: "#F4F4F6",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: LIST_ITEM_HEIGHT
  },
  divider: {
    width: "100%",
    borderTopColor: "#D2D2D2",
    borderTopWidth: 1,
    paddingBottom: 20
  },
  content: {
    flexDirection: "row"
  },
  column: {
    flex: 1
  },
  title: {
    fontSize: 15,
    color: "#9B9B9B"
  },
  value: {
    marginTop: 5,
    fontSize: 18,
    textTransform: "capitalize"
  },
  button: {
    backgroundColor: "#FF5035",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FF5035",
    borderWidth: 2
  },
  buttonText: {
    padding: 12,
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase"
  }
});

const RecipeExpand = ({ time, difficulty }) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}/>
      <View style={styles.content}>
        <View style={[styles.column, { marginRight: 10 }]}>
          <Text style={styles.title}>Difficulty</Text>
          <Text style={styles.value}>{difficulty}</Text>
          <TouchableOpacity style={[styles.button, { backgroundColor:"white" }]}>
            <Text style={[styles.buttonText, { color:"#FF5035" }]}>Save</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.column, { marginLeft: 10 }]}>
          <Text style={styles.title}>Time</Text>
          <Text style={styles.value}>{time}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Brew now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default RecipeExpand;