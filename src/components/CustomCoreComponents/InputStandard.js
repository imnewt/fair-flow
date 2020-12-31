import React from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;

const InputStandard = ({
  label,
  placeholder,
  isPassword,
  isNumber,
  isMultiline,
  elevation,
  text,
  setText,
  disabled,
}) => {
  const customStyles = EStyleSheet.create({
    description: {
      height: '24rem',
    },
    elevation: {
      elevation: dimensions.elevation8,
    },
  });

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        editable={disabled ? false : true}
        multiline={isMultiline ? true : false}
        secureTextEntry={isPassword ? true : false}
        keyboardType={isNumber ? 'numeric' : 'default'}
        placeholder={placeholder || ''}
        style={[
          styles.input,
          isMultiline && customStyles.description,
          elevation && customStyles.elevation,
        ]}
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
});

export default InputStandard;
