import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import Task from "../components/Task";
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { observer, inject } from 'mobx-react';

const Tasks = inject("userStore")(observer(props => {
    const [tasks, setTasks] = useState([]);
    const { userStore } = props;

    useEffect(() => {
        const subscriber = firestore()
        .collection('tasks')
        .onSnapshot(querySnapshot => {
            const tasks = [];
    
            querySnapshot.forEach(documentSnapshot => {
                tasks.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id,
                });
            });

            const filteredTasks = tasks.filter(task => task.underTakerId === userStore.userData.id)
            setTasks(filteredTasks);
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
                <Text style={styles.title}>Tasks</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tasks}
                    renderItem={({ item }) => <Task task={item}/>}
                    keyExtractor={item => item.id}
                />
                <View style={{ height: 30 }}/>
            </ScrollView>
        </View>
    )
}))

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

export default Tasks;