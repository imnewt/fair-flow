import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Overlay} from 'react-native-elements';
import Themes from '../utils/Themes';
const {colors} = Themes;

const Loading = ({isVisible}) => (
  <Overlay
    overlayStyle={{
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    isVisible={isVisible}
    fullScreen>
    <ActivityIndicator size="large" color={colors.primary} />
  </Overlay>
);

export default Loading;
