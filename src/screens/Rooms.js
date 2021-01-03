import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {observer, inject} from 'mobx-react';
import {Room} from '../components/Room';
import {BaseContainer, EmptyState} from '../components/CustomCoreComponents';
import {FormWithOneInput} from '../components/Form';
import Loading from './Loading';

const Rooms = inject('userStore')(
  observer(({userStore}) => {
    const [rooms, setRooms] = useState([]);
    const [roomShortId, setRoomShortId] = useState('');
    const [errRoomShortId, setErrRoomShortId] = useState('');
    const [visibleJoin, setVisibleJoin] = useState(false);
    const [allRooms, setAllRooms] = useState('');
    const [roomName, setRoomName] = useState('');
    const [errRoomName, setErrRoomName] = useState('');
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
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
          setIsEmpty(false);
          const filteredRooms = rooms.filter(
            (room) =>
              room.hostId === userStore.userData.id ||
              room.memberIds.includes(userStore.userData.id),
          );
          setIsLoading(false);
          filteredRooms.length > 0 ? setRooms(filteredRooms) : setIsEmpty(true);
          setAllRooms(rooms);
        });
      return () => subscriber();
    }, []);

    const createRoom = () => {
      setErrRoomName('');
      if (!roomName) {
        setErrRoomName('This field can not be blank!');
        return;
      }
      if (roomName.length > 15) {
        setErrRoomName('Maximum length for room name is 15!');
        return;
      }
      firestore()
        .collection('rooms')
        .add({
          name: roomName,
          shortId: getShortId(),
          hostId: userStore.userData.id,
          memberIds: firestore.FieldValue.arrayUnion(userStore.userData.id),
        })
        .then(() => setVisibleCreate(false));
    };

    const joinRoom = () => {
      setErrRoomShortId('');
      if (!roomShortId) {
        setErrRoomShortId('This field can not be blank!');
      } else {
        const findRoomWithShortId = allRooms.find(
          (room) => room.shortId.toUpperCase() === roomShortId.toUpperCase(),
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
      <BaseContainer
        stickyButton
        tabTitle="Rooms"
        buttonTitle="Join room"
        buttonPress={() => setVisibleJoin(true)}
        setVisible={setVisibleCreate}
        isCenter={rooms.length === 0 ? true : false}>
        {rooms.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={rooms}
            renderItem={({item, index}) => <Room room={item} index={index} />}
            keyExtractor={(item) => item.id}
          />
        ) : null}
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
        <Loading isVisible={isLoading} />
        {isEmpty ? (
          <EmptyState
            screenName="Rooms"
            text1="You haven't join any rooms yet"
            text2="Find one"
          />
        ) : null}
      </BaseContainer>
    );
  }),
);

export default Rooms;
