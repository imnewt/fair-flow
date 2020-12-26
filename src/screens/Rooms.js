import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {Button} from 'react-native-elements';
import {Room} from '../components/Room';
import {FormWithOneInput} from '../components/Form';

const Rooms = inject('userStore')(
  observer((props) => {
    const [rooms, setRooms] = useState([]);
    const {userStore} = props;

    const [allRooms, setAllRooms] = useState('');
    const [roomName, setRoomName] = useState('');
    const [errRoomName, setErrRoomName] = useState('');
    const [visibleCreate, setVisibleCreate] = useState(false);

    const [roomShortId, setRoomShortId] = useState('');
    const [errRoomShortId, setErrRoomShortId] = useState('');
    const [visibleJoin, setVisibleJoin] = useState(false);

    const getShortId = () => {
      var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var result = '';
      for (var i = 0; i < 5; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length),
        );
      }
      return result;
    };

    useEffect(() => {
      const subscriber = firestore()
        .collection('rooms')
        .onSnapshot((querySnapshot) => {
          const rooms = [];
          querySnapshot.forEach((documentSnapshot) => {
            rooms.push({
              ...documentSnapshot.data(),
              id: documentSnapshot.id,
            });
          });
          const filteredRooms = rooms.filter(
            (room) =>
              room.hostId === userStore.userData.id ||
              room.memberIds.includes(userStore.userData.id),
          );
          setAllRooms(rooms);
          setRooms(filteredRooms);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

    const createRoom = () => {
      setErrRoomName('');
      if (!roomName) {
        setErrRoomName('This field can not be blank!');
      } else {
        firestore()
          .collection('rooms')
          .add({
            name: roomName,
            shortId: getShortId(),
            hostId: userStore.userData.id,
            memberIds: [],
          })
          .then(() => setVisibleCreate(false));
      }
    };

    const joinRoom = () => {
      setErrRoomShortId('');
      if (!roomShortId) {
        setErrRoomShortId('This field can not be blank!');
      } else {
        const findRoomWithShortId = allRooms.find(
          (room) => room.shortId === roomShortId,
        );
        if (!findRoomWithShortId) {
          setErrRoomShortId('Room does not exist!');
        } else {
          firestore()
            .collection('rooms')
            .doc(findRoomWithShortId.id)
            .update({
              memberIds: firestore.FieldValue.arrayUnion(userStore.userData.id),
            })
            .then(() => setVisibleJoin(false));
        }
      }
    };

    return (
      <View style={styles.container}>
        <ScrollView style={{padding: 16}} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Rooms</Text>
            <Button
              title="Join room"
              type="outline"
              titleStyle={styles.joinButtonTitle}
              buttonStyle={styles.joinButton}
              onPress={() => setVisibleJoin(true)}
            />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rooms}
            renderItem={({item, index}) => <Room room={item} index={index} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
          />
          <View style={{height: 30}} />
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.7}
          onPress={() => setVisibleCreate(true)}>
          <Ionicons name="ios-add" color="white" size={30} />
        </TouchableOpacity>
        <FormWithOneInput
          visible={visibleJoin}
          setVisible={setVisibleJoin}
          title="Join room"
          text={roomShortId}
          setText={setRoomShortId}
          placeholder="Enter room short id here..."
          errMessage={errRoomShortId}
          setErrMessage={setErrRoomShortId}
          buttonTitle="Join"
          handleOnPress={joinRoom}
        />
        <FormWithOneInput
          visible={visibleCreate}
          setVisible={setVisibleCreate}
          title="Create new room"
          text={roomName}
          setText={setRoomName}
          placeholder="Enter room name here..."
          errMessage={errRoomName}
          setErrMessage={setErrRoomName}
          buttonTitle="Create"
          handleOnPress={createRoom}
        />
      </View>
    );
  }),
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1ED',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '8rem',
    fontWeight: 'bold',
    color: '#C2C1BF',
  },
  joinButtonTitle: {
    fontSize: '3.5rem',
  },
  joinButton: {
    marginLeft: '3rem',
    borderWidth: '0.3rem',
    borderColor: '#2ea7e0',
    paddingVertical: '0.5rem',
    borderRadius: 10,
  },
  btn: {
    position: 'absolute',
    backgroundColor: '#2ea7e0',
    borderRadius: 99,
    width: '18rem',
    height: '18rem',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5rem',
    right: '5rem',
    opacity: 0.8,
    elevation: 5,
  },
});

export default Rooms;
