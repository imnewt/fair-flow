import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { observer, inject } from 'mobx-react';

import { TaskItemInRoom } from "../components/Room"
import { TouchableOpacity } from 'react-native-gesture-handler';
// import 

const RoomDetail = inject("userStore")(observer(props => {
    const { room } = props.route.params;
    const [tasks, setTasks] = useState([])
    const [members, setMembers] = useState([])

    useEffect(() => {
        const getTasks = firestore()
        .collection('tasks')
        .onSnapshot(querySnapshot => {
            const tasks = [];
            querySnapshot.forEach(documentSnapshot => {
                tasks.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id
                });
            });
            if (room.taskIds) {
                const filteredTasks = tasks.filter(task => room.taskIds.includes(task.id))
                setTasks(filteredTasks)
            }
        });
        const getMembers = firestore()
        .collection('users')
        .onSnapshot(querySnapshot => {
            const members = [];
            querySnapshot.forEach(documentSnapshot => {
                members.push({
                    ...documentSnapshot.data(),
                    id: documentSnapshot.id
                });
            });
            if (room.memberIds) {
                const filteredMembers = members.filter(member => room.memberIds.includes(member.id))
                setMembers(filteredMembers)
            }
        });
        return () => {
            getTasks();
            getMembers();
        }
    }, [])

    
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text>{room.name}</Text>
                <Text style={styles.title}>Current tasks:</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={tasks}
                    renderItem={({ item }) => 
                        <TaskItemInRoom
                            name={item.name}
                            progress={item.progress}
                            underTakerId={item.underTakerId}
                        />}
                    keyExtractor={item => item.id}
                />
                <Text style={styles.title}>Members:</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={members}
                    renderItem={({ item }) => <Text style={styles.text}>{item.displayName}</Text>}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={styles.buttonText}>Add task</Text>
            </TouchableOpacity>
        </View>
    )
    
}))

const styles = EStyleSheet.create({
    container: {
        padding: 16
    },
    title: {
        fontWeight: "bold",
        fontSize: "5rem",
        marginVertical: "2rem"
    },
    text: {
        fontSize: "4rem"
    }
})

export default RoomDetail;
