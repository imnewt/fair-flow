import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import List from "./List";
import { FlatList } from "react-native-gesture-handler";

// const list = {
//   name: "Total Points",
//   items: [
//     { name: "Nathaniel Fitzgerald", points: "$3.45" },
//     { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
//     { name: "Jacob Mullins", points: "$3.45" }
//   ]
// };

const lists = [
    {
        name: "Total Points 1",
        items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" }
    ]},
    {
        name: "Total Points 2",
        items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" }
    ]},
    {
        name: "Total Points 3",
        items: [
        { name: "Nathaniel Fitzgerald", points: "$3.45" },
        { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
        { name: "Jacob Mullins", points: "$3.45" }
    ]}
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
      {/* <List {...{ list }} />
      <List {...{ list }} />
      <List {...{ list }} /> */}
    </ScrollView>
  );
};
