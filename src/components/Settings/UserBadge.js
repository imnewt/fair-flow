import React from 'react';
import {Text, View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Avatar from '../../assets/images/avatar.png';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;

const UserBadge = ({userName}) => {
  return (
    <View style={styles.container}>
      <Image source={Avatar} style={styles.avatar} />
      <Text style={styles.text}>
        Hi, <Text style={styles.name}>{userName}</Text>
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '4rem',
    marginHorizontal: '0.5rem',
    padding: '4rem',
    alignItems: 'center',
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
  avatar: {
    width: '28rem',
    height: '30rem',
  },
  text: {
    marginLeft: '3rem',
    fontSize: '8rem',
    flexShrink: 1,
  },
  name: {
    fontStyle: 'italic',
  },
});

export default UserBadge;
