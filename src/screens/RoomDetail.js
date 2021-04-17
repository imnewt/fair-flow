import React, {useState, useEffect} from 'react';
import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {SwipeListView} from 'react-native-swipe-list-view';
import {observer, inject} from 'mobx-react';
import {BaseContainer, ConfirmModal} from '../components/CustomCoreComponents';
import {TaskItemInRoom} from '../components/Room';
import {FormCreateTask} from '../components/Form';
import Themes from '../utils/Themes';
const {colors, dimensions} = Themes;

const RoomDetail = inject('userStore')(
  observer(({userStore, route}) => {
    const {room} = route.params;
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [taskId, setTaskId] = useState('');

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

    const handleUpdateStatus = (task) => {
      let newStatus;
      switch (task.status) {
        case 'Doing':
          newStatus = 'Reviewing';
          break;
        case 'Reviewing':
          newStatus = 'Done';
          break;
        case 'Done':
          newStatus = 'Doing';
          break;
      }
      firestore().collection('tasks').doc(task.id).update({
        status: newStatus,
      });
    };

    const handleDeleteTask = (id) => {
      setIsConfirming(false);
      firestore().collection('tasks').doc(id).delete();
    };

    return (
      <BaseContainer
        tabTitle={room.name}
        roomShortId={room.shortId}
        hostId={room.hostId}
        userId={userStore.userData.id}
        setVisible={setVisible}>
        {tasks.length > 0 ? (
          <Text style={styles.title}>Current tasks:</Text>
        ) : null}
        {room.hostId === userStore.userData.id ? (
          <SwipeListView
            data={tasks}
            renderItem={({item}) => (
              <TaskItemInRoom
                name={item.name}
                deadline={item.deadline}
                progress={item.progress}
                status={item.status}
                underTakerId={item.underTakerId}
              />
            )}
            keyExtractor={(item) => item.id}
            renderHiddenItem={({item}) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnLeft]}
                  onPress={() => handleUpdateStatus(item)}>
                  <Text style={styles.backText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => {
                    setIsConfirming(true);
                    setTaskId(item.id);
                  }}>
                  <Text style={styles.backText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-150}
          />
        ) : (
          <SwipeListView
            data={tasks}
            renderItem={({item}) => (
              <TaskItemInRoom
                name={item.name}
                deadline={item.deadline}
                progress={item.progress}
                status={item.status}
                underTakerId={item.underTakerId}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}

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
        <ConfirmModal
          visible={isConfirming}
          content="Do you really want to delete it?"
          onConfirm={() => handleDeleteTask(taskId)}
          onCancel={() => setIsConfirming(false)}
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
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
    marginRight: '0.5rem',
    marginBottom: '3.1rem',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: colors.primary,
    right: 75,
  },
  // backRightBtnMiddle: {
  //   backgroundColor: 'pink',
  //   right: 75,
  // },
  backRightBtnRight: {
    backgroundColor: '#ed5e68',
    right: 0,
    borderTopRightRadius: dimensions.borderRadius,
    borderBottomRightRadius: dimensions.borderRadius,
  },
  backText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RoomDetail;
