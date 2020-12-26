import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {TaskItemInRoom} from '../components/Room';
import {FormCreateTask} from '../components/Form';
import Header from '../components/Header';
import Themes from '../utils/Themes';
const {colors, dimensions} = Themes;

const RoomDetail = inject('userStore')(
  observer((props) => {
    const {room} = props.route.params;
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [firstMemberId, setFirstMemberId] = useState('');
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
            filteredMembers.length > 0 &&
              setFirstMemberId(filteredMembers[0].id);
          }
        });
      return () => {
        getTasks();
        getMembers();
      };
    }, []);

    return (
      <View style={styles.container}>
        <Header title={room.name} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.title}>Current tasks:</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={tasks}
            renderItem={({item}) => (
              <TaskItemInRoom
                name={item.name}
                progress={item.progress}
                underTakerId={item.underTakerId}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <Text style={styles.title}>Members:</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={members}
            renderItem={({item}) => (
              <Text style={styles.text}>{item.displayName}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
        <FormCreateTask
          visible={visible}
          setVisible={setVisible}
          roomId={room.id}
          memberList={members}
          firstMemberId={firstMemberId}
        />
      </View>
    );
  }),
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: dimensions.standardSpacing,
    paddingTop: 0,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '6rem',
    marginTop: dimensions.standardSpacing,
  },
  text: {
    fontSize: '4rem',
  },
  button: {
    backgroundColor: colors.primary,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: '4rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RoomDetail;
