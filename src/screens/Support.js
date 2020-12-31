import React from 'react';
import {Text, View} from 'react-native';
import {BaseContainer} from '../components/CustomCoreComponents';
import EStyleSheet from 'react-native-extended-stylesheet';

const Support = () => {
  return (
    <BaseContainer tabTitle="support" isCenter>
      <View style={styles.container}>
        <Text style={styles.text}>
          For further information or any support, please contact us via:
        </Text>
        <Text style={styles.info}>
          Email: <Text style={{fontWeight: 'normal'}}>newt@fairflow.com</Text>
        </Text>
        <Text style={styles.info}>
          Phone: <Text style={{fontWeight: 'normal'}}>+8485 437 4769</Text>
        </Text>
      </View>
    </BaseContainer>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: '4.8rem',
    fontStyle: 'italic',
  },
  info: {
    marginTop: '3rem',
    fontWeight: '700',
    fontSize: '4.5rem',
  },
});

export default Support;
