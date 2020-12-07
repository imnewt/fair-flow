import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import { Recipe } from "../components/Accordion";
import Ionicons from "react-native-vector-icons/Ionicons";
import EStyleSheet from 'react-native-extended-stylesheet';

import firestore from '@react-native-firebase/firestore';

import Room from "../components/Room"
import { FlatList } from "react-native-gesture-handler";

const Rooms = () => {


    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
        .collection('rooms')
        .onSnapshot(querySnapshot => {
            const rooms = [];
    
            querySnapshot.forEach(documentSnapshot => {
                rooms.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id,
                });
            });
            setRooms(rooms);
        });
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView 
                style={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Rooms</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={rooms}
                    renderItem={({ item, index }) => <Room room={item} index={index}/>}
                    keyExtractor={item => item.key}
                    numColumns={2}
                />
                <View style={{ height: 30 }}/>
            </ScrollView>
            <View style={styles.btn}>
                <Ionicons name="ios-add" color="white" size={30}/>
            </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F2F1ED"
    },
    title: {
      fontSize: "8rem",
      fontWeight: "bold",
      color: "#C2C1BF"
    },
    btn: {
      position: "absolute",
      backgroundColor:"#2ea7e0",
      borderRadius: 99,
      width: "18rem",
      height: "18rem",
      justifyContent: "center",
      alignItems: "center",
      bottom: "5rem",
      right: "5rem",
      opacity: 0.8,
      elevation: 5
    }
})

export default Rooms;