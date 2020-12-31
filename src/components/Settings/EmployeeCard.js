import React from 'react';
import {View, Image, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const EmployeeCard = ({employee}) => {
  return (
    <View style={styles.container}>
      <Image source={employee.avatar} style={styles.image} />
      <View style={{alignItems: 'center'}}>
        <Text style={styles.name}>{employee.name}</Text>
        <Text style={styles.position}>{employee.position}</Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3rem',
    marginBottom: '8rem',
    alignItems: 'center',
  },
  image: {
    width: '35rem',
    height: '35rem',
    borderRadius: dimensions.borderRadius,
  },
  name: {
    marginTop: '5rem',
    fontSize: '4.8rem',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  position: {
    marginTop: '2rem',
    color: colors.secondary,
    textTransform: 'capitalize',
  },
});

export default EmployeeCard;
