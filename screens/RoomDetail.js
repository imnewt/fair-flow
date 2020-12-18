import React, { useState, useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { observer, inject } from 'mobx-react';

import { TaskItemInRoom } from "../components/Room"

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
            <Text>{room.name}</Text>
            {/* <Text>Member List:</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={members}
                renderItem={({ item }) => <Text>{item.displayName + item.id}</Text>}
                keyExtractor={item => item.id}
            /> */}
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
        marginBottom: "2rem"
    }
})

export default RoomDetail;
