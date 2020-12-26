import React from 'react';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LogoImage from '../../assets/images/logo.png';

const Logo = () => {
  return <Image source={LogoImage} style={styles.logo} />;
};

const styles = EStyleSheet.create({
  logo: {
    alignSelf: 'center',
    width: '70rem',
    height: '70rem',
  },
});

export default Logo;
