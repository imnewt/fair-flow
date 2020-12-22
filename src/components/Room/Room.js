import React, { useState, useEffect, useDebugValue } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native"

const Room = ({ room, index }) => {
    const navigation = useNavigation();
    const [hostName, setHostName] = useState([]);

    const isOdd = index % 2 == 0 ? true : false

    useEffect(() => {
        const subscriber = firestore()
        .collection('users')
        .doc(room.hostId)
        .onSnapshot(querySnapshot => setHostName(querySnapshot.data().displayName));
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
        <View 
            style={[styles.container, customStyles.containerStyle]}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("RoomDetail", { room })}
                activeOpacity={.7}
            >
                <Text style={styles.roomName}>{room.name}</Text>
                <Text style={styles.text}>Host: {hostName}</Text>
                <Text style={styles.text}>Members: {room.memberIds.length + 1}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginVertical: "2rem",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1
    },
    button: {
        padding: "4rem",
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