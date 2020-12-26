import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
const FormWithOneInput = ({
  visible,
  setVisible,
  title,
  text,
  setText,
  placeholder,
  errMessage,
  setErrMessage,
  buttonTitle,
  handleOnPress,
}) => {
  const toggleOverlay = () => {
    setVisible(false);
    setText('');
    setErrMessage('');
  };
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={{width: '90%', borderRadius: 10}}>
      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>{title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder={placeholder}
        />
        {errMessage ? <Text style={styles.error}>{errMessage}</Text> : null}
        <Button
          title={buttonTitle}
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={handleOnPress}
        />
      </View>
    </Overlay>
  );
};
const styles = EStyleSheet.create({
  overlay: {
    backgroundColor: '#fff',
    margin: '2rem',
  },
  overlayTitle: {
    fontSize: '6rem',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#eee',
    marginTop: '3rem',
    height: '12rem',
    width: '100%',
    padding: '2rem',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    fontSize: '4rem',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4rem',
  },
  button: {
    backgroundColor: '#2ea7e0',
    marginTop: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3rem',
  },
  buttonTitle: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormWithOneInput;
