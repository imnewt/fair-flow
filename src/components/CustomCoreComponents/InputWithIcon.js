import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const InputWithIcon = ({
  placeholder,
  isPassword,
  iconName,
  text,
  setText,
  errMessage,
}) => {
  const [show, setShow] = useState(false);
  return (
    <View style={styles.container}>
      <Input
        placeholder={placeholder}
        placeholderTextColor={colors.inputTextColor}
        secureTextEntry={isPassword ? (show ? false : true) : false}
        leftIcon={
          <Ionicons
            name={iconName}
            size={dimensions.iconSize}
            color={colors.inputTextColor}
          />
        }
        inputStyle={styles.input}
        onChangeText={(text) => setText(text)}
        value={text}
        errorMessage={errMessage}
      />
      {isPassword ? (
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.7}
          onPress={() => setShow(!show)}>
          <Ionicons
            name={show ? 'ios-eye' : 'ios-eye-off'}
            size={dimensions.chevronIconSize}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    position: 'relative',
  },
  input: {
    marginLeft: '2rem',
    fontSize: '4rem',
    fontWeight: '500',
  },
  icon: {
    position: 'absolute',
    width: '10rem',
    height: '10rem',
    alignItems: 'center',
    justifyContent: 'center',
    right: '2rem',
    bottom: '7rem',
    elevation: 2,
  },
});

export default InputWithIcon;
