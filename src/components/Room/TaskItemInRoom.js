import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EStyleSheet from "react-native-extended-stylesheet"
import firestore from '@react-native-firebase/firestore';

const TaskItemInRoom = (props) => {
    const { name, underTakerId, progress} = props;
    const [underTakerName, setUnderTakerName] = useState("");

    useEffect(() => {
        const subscriber = firestore()
        .collection('users')
        .doc(underTakerId)
        .onSnapshot(querySnapshot => setUnderTakerName(querySnapshot.data().displayName));
        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.taskName}>{name}</Text>
            <Text style={styles.underTakerName}>{underTakerName}</Text>
            <Text style={styles.taskProgress}>{progress}%</Text>
        </View>
    )
}

const styles = EStyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    taskName: {
        flex: 4,
        fontSize: "4rem"
    },
    underTakerName: {
        flex: 1,
        fontSize: "4rem"
    },
    taskProgress: {
        flex: 1,
        fontSize: "4rem"
    }
})

export default TaskItemInRoom