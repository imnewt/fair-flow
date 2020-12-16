import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { observer, inject } from 'mobx-react';

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
                const filteredTasks = tasks.filter(task => room.taskIds.includes(task.id))
                setTasks(filteredTasks)
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
                const filteredMembers = members.filter(member => room.memberIds.includes(member.id))
                setMembers(filteredMembers)
            });
    }, [])

    
    return (
        <View style={styles.container}>
            <Text>{room.name}</Text>
            <Text>Task List:</Text>
            <Text>Member List:</Text>
        </View>
    )
    
}))

const styles = EStyleSheet.create({
    container: {

    }
})

export default RoomDetail;
