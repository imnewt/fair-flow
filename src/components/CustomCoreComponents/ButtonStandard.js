import React from 'react';
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const ButtonStandard = ({title, onButtonPress}) => (
  <Button
    title={title}
    titleStyle={styles.title}
    buttonStyle={styles.button}
    onPress={onButtonPress}
  />
);

const styles = EStyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    marginTop: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.borderRadius,
    padding: '3rem',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default ButtonStandard;
