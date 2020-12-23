import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {Overlay, Button} from 'react-native-elements';
import Header from '../components/Header';
import {Room} from '../components/Room';

const Rooms = inject('userStore')(
  observer((props) => {
    const [rooms, setRooms] = useState([]);
    const {userStore} = props;

    const [roomName, setRoomName] = useState('');
    const [errRoomName, setErrRoomName] = useState('');
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
      setVisible(false);
      setRoomName('');
      setErrRoomName('');
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
          setRooms(filteredRooms);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }, []);

    const createRoom = async () => {
      setErrRoomName('');
      if (!roomName) {
        setErrRoomName('This field can not be blank!');
      } else {
        firestore()
          .collection('rooms')
          .add({
            name: roomName,
            hostId: userStore.userData.id,
            memberIds: [],
          })
          .then(() => setVisible(false));
      }
    };

    return (
      <View style={styles.container}>
        {/* <Header title="Rooms"/> */}
        <ScrollView style={{padding: 16}} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Rooms</Text>
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
          onPress={() => setVisible(true)}>
          <Ionicons name="ios-add" color="white" size={30} />
        </TouchableOpacity>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{width: '90%', borderRadius: 10}}>
          <View style={styles.overlay}>
            <Text style={styles.overlayTitle}>Create new room</Text>
            <TextInput
              style={styles.input}
              onChangeText={(roomName) => setRoomName(roomName)}
              value={roomName}
              placeholder="Enter room name here..."
            />
            {errRoomName ? (
              <Text style={styles.error}>{errRoomName}</Text>
            ) : null}
            <Button
              title="Create"
              titleStyle={styles.buttonText}
              buttonStyle={styles.button}
              onPress={createRoom}
            />
          </View>
        </Overlay>
      </View>
    );
  }),
);

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1ED',
  },
  title: {
    fontSize: '8rem',
    fontWeight: 'bold',
    color: '#C2C1BF',
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
  overlay: {
    backgroundColor: '#fff',
    margin: '2rem',
  },
  overlayTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#eee',
    marginTop: '3rem',
    height: '12rem',
    width: '100%',
    padding: '2rem',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    fontSize: '4rem',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4rem',
  },
  button: {
    backgroundColor: '#2ea7e0',
    marginTop: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3rem',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default Rooms;
