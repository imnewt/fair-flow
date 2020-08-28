import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Recipe } from "../components/Accordion";
import Ionicons from "react-native-vector-icons/Ionicons";

const lists = [
    {
      beverageName: "weasel coffee",
      country: "Vietnam",
      creator: "Huyen Pham",
      time: "4:00",
      difficulty: "Medium"
    },
    {
      beverageName: "cappuccino",
      country: "Korea",
      creator: "Tan Truc",
      time: "2:00",
      difficulty: "Easy"
    },
    {
      beverageName: "espresso",
      country: "Japan",
      creator: "Quynh Han",
      time: "5:50",
      difficulty: "Hard"
    },
    {
      beverageName: "espresso",
      country: "Japan",
      creator: "Quynh Han",
      time: "5:50",
      difficulty: "Hard"
    },
    {
      beverageName: "espresso",
      country: "Japan",
      creator: "Quynh Han",
      time: "5:50",
      difficulty: "Hard",
      isLast: true
    }
]

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
      backgroundColor:"#FF5035",
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

const Feed = () => {
    return (
    <View style={styles.container}>
        <ScrollView 
            style={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Feed</Text>
            {
                lists.map((item, index) =>
                <Recipe key={index} list={item}/>)
            }
            <View style={{ height: 30 }}/>
        </ScrollView>
        <View style={styles.btn}>
            <Ionicons name="ios-add" color="white" size={30}/>
        </View>
    </View>
    )
}

export default Feed;