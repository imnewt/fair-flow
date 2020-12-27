import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;

const SettingOption = ({iconName, iconBackground, title}) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7}>
      <View style={[styles.iconWrapper, {backgroundColor: iconBackground}]}>
        <Ionicons name={iconName} color="white" size={dimensions.iconSize} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Ionicons
        name="chevron-forward-outline"
        color="#8A9194"
        size={dimensions.iconSize}
      />
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: '2rem',
    alignItems: 'center',
  },
  iconWrapper: {
    padding: '1.8rem',
    borderRadius: 99,
  },
  title: {
    flex: 1,
    fontSize: '4.7rem',
    textTransform: 'capitalize',
    marginLeft: '4rem',
  },
});

export default SettingOption;
