import React from 'react';
import {Text, View} from 'react-native';
import {Button, Divider} from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';
import Themes from '../../utils/Themes';
const {colors} = Themes;

const ButtonGroup = ({
  buttonTitle1,
  buttonTitle2,
  buttonPress1,
  buttonPress2,
}) => {
  return (
    <View>
      <Button
        title={buttonTitle1}
        buttonStyle={[styles.button, {backgroundColor: colors.primary}]}
        onPress={buttonPress1}
      />
      <View style={styles.dividerBlock}>
        <Divider style={styles.divider} />
        <Text style={styles.text}>or</Text>
        <Divider style={styles.divider} />
      </View>
      <Button
        title={buttonTitle2}
        type="outline"
        buttonStyle={styles.button}
        onPress={buttonPress2}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  button: {
    marginTop: '3rem',
    borderWidth: '0.3rem',
    borderColor: colors.primary,
    paddingVertical: '3.5rem',
    borderRadius: 5,
    overflow: 'hidden',
  },
  dividerBlock: {
    marginTop: '3rem',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: '43%',
    height: 0.8,
  },
  text: {
    marginHorizontal: '4rem',
    fontSize: '4rem',
  },
});

export default ButtonGroup;
