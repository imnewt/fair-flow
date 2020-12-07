import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import { Recipe } from "../components/Accordion";
import Ionicons from "react-native-vector-icons/Ionicons";
import EStyleSheet from 'react-native-extended-stylesheet';

const Room = ({ room, index }) => {

    const [recipes, setRecipes] = useState([]);

    const isOdd = index % 2 == 0 ? true : false

    useEffect(() => {
        const subscriber = firestore()
        .collection('rooms')
        // .doc(task.roomId)
        .onSnapshot(querySnapshot => setRoomName(querySnapshot.data().name));
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    const customStyles = EStyleSheet.create({
        containerStyle: {
            marginLeft: !isOdd ? "2rem" : 0,
            marginRight: isOdd ? "2rem" : 0
        }
    });

    return (
        <View style={[styles.container, customStyles.containerStyle]}>
            <Text style={styles.roomName}>{room.name}</Text>
            <Text style={styles.text}>Host:</Text>
            <Text style={styles.text}>Members: {room.memberIds.length + 1}</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginVertical: "2rem",
        padding: "4rem",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    roomName: {
        fontSize: "5.5rem",
        fontWeight: "bold"
    },
    text: {
        marginTop: "1.5rem",
        fontSize: "4rem"
    },
    members: {

    }
})

export default Room;