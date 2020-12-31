import React from 'react';
import {View, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors} = Themes;

const ErrorMessage = ({message}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: '3rem',
    marginVertical: '2rem',
  },
  text: {
    fontSize: '4rem',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.error,
  },
});

export default ErrorMessage;
