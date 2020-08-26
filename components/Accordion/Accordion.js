import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import List from "./List";
import { FlatList } from "react-native-gesture-handler";

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
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f1ed",
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#c2c1bf"
  }
});

export default () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <FlatList 
        data={lists}
        renderItem={({item})=> (
            <List list={item}/>
        )}
      />
      <View style={{height: 30}}/>
    </ScrollView>
  );
};