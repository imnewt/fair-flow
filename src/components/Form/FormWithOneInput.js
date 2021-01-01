import React from 'react';
import {Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  ButtonStandard,
  InputStandard,
  ErrorMessage,
} from '../CustomCoreComponents';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;

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
      overlayStyle={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <InputStandard
          text={text}
          setText={setText}
          placeholder={placeholder}
          elevation
        />
        {errMessage ? <ErrorMessage message={errMessage} /> : null}
        <ButtonStandard title={buttonTitle} onButtonPress={handleOnPress} />
      </View>
    </Overlay>
  );
};

const styles = EStyleSheet.create({
  container: {
    width: '90%',
    borderRadius: dimensions.borderRadius,
  },
  overlay: {
    backgroundColor: 'white',
    margin: '2rem',
  },
  title: {
    marginBottom: '2rem',
    fontSize: '6rem',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});

export default FormWithOneInput;
