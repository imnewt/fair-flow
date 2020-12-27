import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

const ButtonAdd = ({setVisible}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={() => setVisible(true)}>
      <Ionicons name="ios-add" color="white" size={30} />
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: '#2ea7e0',
    borderRadius: 99,
    width: '18rem',
    height: '18rem',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    bottom: '5rem',
    right: '5rem',
    opacity: 0.8,
    elevation: 5,
  },
});

export default ButtonAdd;
