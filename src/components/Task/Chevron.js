import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';
import EStyleSheet from 'react-native-extended-stylesheet';
import {mix} from 'react-native-redash';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const Chevron = ({transition}) => {
  const rotateZ = mix(transition, Math.PI, 0);
  return (
    <Animated.View style={[styles.container, {transform: [{rotateZ}]}]}>
      <Ionicons
        name="ios-arrow-down-outline"
        color="white"
        size={dimensions.chevronIconSize}
      />
    </Animated.View>
  );
};

const styles = EStyleSheet.create({
  container: {
    height: '7.5rem',
    width: '7.5rem',
    borderRadius: '3.75rem',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default Chevron;
