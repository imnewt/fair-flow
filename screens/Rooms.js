import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import { Recipe } from "../components/Accordion";
import Ionicons from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F2F1ED"
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#C2C1BF"
    },
    btn: {
      position: "absolute",
      backgroundColor:"#2ea7e0",
      borderRadius: 99,
      width: 70,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      bottom: 20,
      right: 20,
      opacity: 0.8,
      elevation: 5
    }
})

const Rooms = () => {

    const [recipes, setRecipes] = useState([]);

    

    return (
    <View style={styles.container}>
        <ScrollView 
            style={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Rooms</Text>
            {/* {
                recipes.map((item, index) =>
                <Recipe key={index} recipe={item}/>)
            } */}
            <View style={{ height: 30 }}/>
        </ScrollView>
        <View style={styles.btn}>
            <Ionicons name="ios-add" color="white" size={30}/>
        </View>
    </View>
    )
}

export default Rooms;