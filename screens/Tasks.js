import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import Task from "../components/Task";
import { HOST } from "../utils"
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F0F2EF"
    },
    title: {
      fontSize: "8rem",
      fontWeight: "bold",
      color: "#C2C1BF"
    }
})

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${HOST}/api/tasks`, {
            method: 'GET'
        })
        .then((response) => response.json())
        .then((responseJson) => {
            setTasks(responseJson)
        })
        .catch(error => console.error(error));
    }, [])

    return (
    <View style={styles.container}>
        <ScrollView 
            style={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Tasks</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) => <Task task={item}/>}
                keyExtractor={(item) => `${item._id}`}
            />
            <View style={{ height: 30 }}/>
        </ScrollView>
    </View>
    )
}

export default Tasks;