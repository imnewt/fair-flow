import React, {useState, useEffect} from 'react';
import {Text, FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {BaseContainer} from '../components/CustomCoreComponents';
import {TaskItemInRoom} from '../components/Room';
import {FormCreateTask} from '../components/Form';
import Themes from '../utils/Themes';
const {dimensions} = Themes;

const RoomDetail = inject('userStore')(
  observer(({userStore, route}) => {
    const {room} = route.params;
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const getTasks = firestore()
        .collection('tasks')
        .onSnapshot((querySnapshot) => {
          const tasks = [];
          querySnapshot.forEach((documentSnapshot) => {
            tasks.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          const filteredTasks = tasks.filter((task) => task.roomId === room.id);
          setTasks(filteredTasks);
        });
      const getMembers = firestore()
        .collection('users')
        .onSnapshot((querySnapshot) => {
          const members = [];
          querySnapshot.forEach((documentSnapshot) => {
            members.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          if (room.memberIds) {
            const filteredMembers = members.filter((member) =>
              room.memberIds.includes(member.id),
            );
            setMembers(filteredMembers);
          }
        });
      return () => {
        getTasks();
        getMembers();
      };
    }, []);

    return (
      <BaseContainer
        tabTitle={room.name}
        hostId={room.hostId}
        userId={userStore.userData.id}
        setVisible={setVisible}>
        {tasks.length > 0 ? (
          <Text style={styles.title}>Current tasks:</Text>
        ) : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={({item}) => (
            <TaskItemInRoom
              name={item.name}
              deadline={item.deadline}
              progress={item.progress}
              underTakerId={item.underTakerId}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        {members.length > 0 ? <Text style={styles.title}>Members:</Text> : null}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={members}
          renderItem={({item}) => (
            <Text style={styles.text}>{item.displayName}</Text>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.memberList}
        />
        <FormCreateTask
          visible={visible}
          setVisible={setVisible}
          roomId={room.id}
          memberList={members}
        />
      </BaseContainer>
    );
  }),
);

const styles = EStyleSheet.create({
  title: {
    marginTop: '4rem',
    marginLeft: '2rem',
    fontSize: '5.5rem',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  memberList: {
    marginBottom: dimensions.standardSpacing,
  },
  text: {
    marginBottom: '1rem',
    marginLeft: '2rem',
    fontSize: '4rem',
  },
});

export default RoomDetail;
