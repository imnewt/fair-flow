import React from 'react';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';

const InputWithIcon = ({
  placeholder,
  isPassword,
  iconName,
  text,
  setText,
  errMessage,
}) => {
  return (
    <Input
      placeholder={placeholder}
      placeholderTextColor="#3F4350"
      secureTextEntry={isPassword ? true : false}
      leftIcon={<Ionicons name={iconName} size={25} color="#3F4350" />}
      inputStyle={styles.input}
      onChangeText={(text) => setText(text)}
      value={text}
      errorMessage={errMessage}
    />
  );
};

const styles = EStyleSheet.create({
  input: {
    marginLeft: '2rem',
    fontSize: '4rem',
    fontWeight: '500',
  },
});

export default InputWithIcon;
