import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const TabTitle = ({title, buttonTitle, buttonPress, roomShortId}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title} </Text>
      {buttonTitle ? (
        <Button
          title={buttonTitle}
          type="outline"
          titleStyle={styles.buttonTitle}
          buttonStyle={styles.button}
          onPress={buttonPress}
        />
      ) : null}
      {roomShortId ? <Text style={styles.roomId}>{roomShortId}</Text> : null}
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
    borderBottomWidth: '1rem',
    borderBottomColor: colors.primary,
    color: colors.secondary,
    flexShrink: 1,
  },
  buttonTitle: {
    fontSize: '3.5rem',
  },
  button: {
    marginLeft: '3rem',
    borderWidth: '0.3rem',
    borderColor: colors.primary,
    paddingVertical: '0.5rem',
    // borderRadius: 10,
    overflow: 'hidden',
  },
  roomId: {
    fontSize: '8rem',
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default TabTitle;
