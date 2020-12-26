import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Alert = ({visible, toggleOverlay, content}) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{borderRadius: 20}}>
      <View style={styles.container}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={80}
          color="#109648"
        />
        <Text style={styles.text}>{content}</Text>
      </View>
    </Overlay>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: '8rem',
    paddingHorizontal: '15rem',
    borderRadius: 120,
  },
  text: {
    paddingTop: '3rem',
    fontSize: '5rem',
    fontWeight: '900',
  },
});

export default Alert;
