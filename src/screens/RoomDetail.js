import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import { Input, Button, Divider, Overlay } from 'react-native-elements';
import { observer, inject } from 'mobx-react';

import { TaskItemInRoom } from "../components/Room"
import Header from "../components/Header"
import Themes from "../utils/Themes"
const { colors, dimensions } = Themes;
const RoomDetail = inject("userStore")(observer(props => {

    const { room } = props.route.params;
    const [tasks, setTasks] = useState([])
    const [members, setMembers] = useState([])
    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [errTaskName, setErrTaskName] = useState("")

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

    const createTask = async () => {
        setErrTaskName("");
        if (!taskName) {
            setErrTaskName("This field can not be blank!");
        }
        // else {
        //     firestore()
        //     .collection('tasks')
        //     .add({
        //         name: taskName,
        //         description,
        //         progress: 0,
        //         deadline: "",
        //         roomId: room.id,
        //         underTakerId: ""
        //     })
        //     .then(() => setVisible(false))
        // }
    }

    return (
        <View style={styles.container}>
            <Header title={room.name}/>
            <ScrollView
                contentContainerStyle={styles.scroll}
            >
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
                onPress={() => setVisible(true)}
            >
                <Text style={styles.buttonText}>Add task</Text>
            </TouchableOpacity>
            <Overlay 
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                overlayStyle={{
                    // width: "90%",
                    borderRadius: dimensions.borderRadius,
                    // marginHorizontal: 300,
                    // backgroundColor: "red"
                }}
                // fullScreen={true}
            >
                <View style={styles.overlay}>
                    <Text style={styles.overlayTitle}>Create new task</Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={taskName => setTaskName(taskName)}
                        value={taskName}
                        placeholder="Enter task name here..."
                    />
                    <TextInput 
                        style={styles.input}
                        onChangeText={description => setDescription(description)}
                        value={description}
                        placeholder="Enter task description here..."
                    />
                    {
                        errTaskName ? <Text style={styles.error}>{errTaskName}</Text> : null
                    }
                    <Button
                        title="Create"
                        titleStyle={styles.overlayButtonText}
                        buttonStyle={styles.overlayButton}
                        onPress={createTask}
                    />
                </View>
            </Overlay>
        </View>
    )
    
}))

const styles = EStyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        padding: dimensions.sixteen,
        paddingTop: 0
        // backgroundColor: "red"
    },
    title: {
        fontWeight: "bold",
        fontSize: "6rem",
        marginTop: dimensions.sixteen
    },
    text: {
        fontSize: "4rem"
    },
    button: {
        backgroundColor: colors.primary,
        width: "90%",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        borderRadius: 10,
        marginBottom: 16
    },
    buttonText: {
        color: "white",
        fontSize: "4rem",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    overlay: {
        backgroundColor: "white",
        padding: "2rem",
        // width: "90%"
    },
    overlayTitle: {
        fontSize: "6rem",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "capitalize"
    },
    input: {
        backgroundColor: "#eee",
        marginTop: "3rem",
        height: "12rem",
        width: "100%",
        padding: "2rem",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 1,
        fontSize: "4rem"
    },
    overlayButton: {
        backgroundColor: "#2ea7e0",
        marginTop: "4rem",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: "3rem"
    },
    overlayButtonText: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase"
    },
    error: {
        color: "red",
        fontWeight: "bold",
        alignSelf: "center",
        marginTop: "4rem"
    },
})

export default RoomDetail;
