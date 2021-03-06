import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Overlay} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const Alert = ({visible, toggleOverlay, content}) => (
  <Overlay isVisible={visible} overlayStyle={styles.container}>
    <View style={{width: '100%'}}>
      <View style={styles.icon}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={dimensions.alertIconSize}
          color="white"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Great!</Text>
        <Text style={[styles.text, styles.contentText]}>{content}.</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={toggleOverlay}>
          <Ionicons name="close" size={dimensions.iconSize} color="white" />
          <Text style={styles.buttonText}>close</Text>
        </TouchableOpacity>
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
    backgroundColor: colors.alertBackground,
    borderTopLeftRadius: dimensions.borderRadius,
    borderTopRightRadius: dimensions.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6rem',
  },
  content: {
    width: '100%',
    marginVertical: '3rem',
    alignItems: 'center',
  },
  text: {
    fontSize: '6rem',
    fontWeight: 'bold',
  },
  contentText: {
    marginTop: '1rem',
    fontSize: '4rem',
    fontWeight: 'normal',
  },
  button: {
    marginTop: '4rem',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.alertButton,
    paddingVertical: '2rem',
    paddingHorizontal: '6rem',
    borderRadius: 20,
  },
  buttonText: {
    marginLeft: '0.5rem',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default Alert;
