import React from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const InputStandard = ({
  label,
  isPassword,
  isNumber,
  text,
  setText,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        editable={disabled ? false : true}
        secureTextEntry={isPassword ? true : false}
        keyboardType={isNumber ? 'numeric' : 'default'}
        style={styles.input}
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: '3rem',
  },
  label: {
    marginVertical: '1.5rem',
    marginLeft: '4rem',
    color: 'black',
    fontSize: '4.5rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input: {
    marginHorizontal: '0.5rem',
    paddingLeft: '4rem',
    fontSize: '4rem',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 2,
  },
});

export default InputStandard;
