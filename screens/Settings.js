import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
// import { Recipe } from "../components/Accordion";
import Ionicons from "react-native-vector-icons/Ionicons";

const Settings = () => {

    return (
        <View style={styles.container}>
            <ScrollView 
                style={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Settings</Text>
            </ScrollView>
        </View>
    )
}

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

export default Settings;