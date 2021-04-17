import React from 'react';
import {Text, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Overlay} from 'react-native-elements';
import {Button} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const ConfirmModal = ({visible, content, onConfirm, onCancel}) => (
  <Overlay isVisible={visible} overlayStyle={styles.container}>
    <View style={styles.modal}>
      <View style={styles.icon}>
        <Ionicons
          name="ios-close-circle-outline"
          size={dimensions.alertIconSize}
          color="#F44336"
        />
      </View>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.buttonGroup}>
        <Button
          title="Yes"
          titleStyle={styles.title}
          buttonStyle={styles.button}
          onPress={onConfirm}
        />
        <Button
          title="No"
          titleStyle={styles.title}
          buttonStyle={[styles.button, {backgroundColor: '#C1C1C1'}]}
          onPress={onCancel}
        />
      </View>
    </View>
  </Overlay>
);

const styles = EStyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
    padding: 0,
    borderRadius: dimensions.borderRadius,
  },
  icon: {
    width: '100%',
    borderTopLeftRadius: dimensions.borderRadius,
    borderTopRightRadius: dimensions.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    padding: dimensions.standardSpacing,
  },
  content: {
    fontSize: '5rem',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '37rem',
    backgroundColor: colors.primary,
    marginTop: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimensions.borderRadius,
    padding: '2rem',
    backgroundColor: '#F44336',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmModal;
