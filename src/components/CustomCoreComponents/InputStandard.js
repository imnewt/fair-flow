import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [show, setShow] = useState(false);

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
        secureTextEntry={isPassword ? (show ? false : true) : false}
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
      {isPassword && (
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.7}
          onPress={() => setShow(!show)}>
          <Ionicons
            name={show ? 'ios-eye' : 'ios-eye-off'}
            size={dimensions.chevronIconSize}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginVertical: '3rem',
    position: 'relative',
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
  icon: {
    position: 'absolute',
    width: '10rem',
    height: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    right: '2rem',
    bottom: '1rem',
    elevation: 2,
  },
});

export default InputStandard;
