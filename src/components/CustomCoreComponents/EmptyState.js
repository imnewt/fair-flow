import React from 'react';
import {Text, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SleepingBear from '../../assets/images/sleeping-bear.png';
import SadCactus from '../../assets/images/sad-cactus.png';

const EmptyState = ({screenName, text1, text2}) => (
  <View style={styles.container}>
    <Image
      source={screenName == 'Tasks' ? SleepingBear : SadCactus}
      resizeMode="stretch"
      style={styles.image}
    />
    <Text style={styles.text}>{text1}.</Text>
    <Text style={[styles.text, {fontWeight: 'normal', fontStyle: 'italic'}]}>
      {text2}!
    </Text>
  </View>
);

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: '80rem',
    height: '80rem',
    marginBottom: '6rem',
  },
  text: {
    fontSize: '4.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
});

export default EmptyState;
