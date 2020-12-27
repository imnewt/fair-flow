import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const TabTitle = ({title, buttonTitle, buttonPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {buttonTitle ? (
        <Button
          title={buttonTitle}
          type="outline"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={buttonPress}
        />
      ) : null}
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingTop: dimensions.standardSpacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '8rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: colors.secondary,
  },
  buttonTitle: {
    fontSize: '3.5rem',
  },
  button: {
    marginLeft: '3rem',
    borderWidth: '0.3rem',
    borderColor: '#2ea7e0',
    paddingVertical: '0.5rem',
    borderRadius: 10,
  },
});

export default TabTitle;
