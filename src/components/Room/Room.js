import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;

const Room = ({room, index}) => {
  const navigation = useNavigation();
  const [hostName, setHostName] = useState([]);
  const isOdd = index % 2 == 0 ? true : false;

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(room.hostId)
      .onSnapshot((querySnapshot) =>
        setHostName(querySnapshot.data().displayName),
      );
    return () => subscriber();
  }, []);

  const customStyles = EStyleSheet.create({
    containerStyle: {
      marginLeft: !isOdd ? '2rem' : '1rem',
      marginRight: isOdd ? '2rem' : '1rem',
    },
  });

  return (
    <View style={[styles.container, customStyles.containerStyle]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RoomDetail', {room})}
        activeOpacity={0.7}>
        <Text style={styles.roomName}>{room.name}</Text>
        <Text style={styles.text}>Host: {hostName}</Text>
        <Text style={styles.text}>Members: {room.memberIds.length + 1}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '4rem',
    marginBottom: '0.5rem',
    borderRadius: dimensions.borderRadius,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: dimensions.elevation,
  },
  button: {
    padding: '4rem',
  },
  roomName: {
    fontSize: '5.5rem',
    fontWeight: 'bold',
  },
  text: {
    marginTop: '1.5rem',
    fontSize: '4rem',
  },
});

export default Room;
