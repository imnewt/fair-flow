import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Overlay} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import {
  InputStandard,
  ErrorMessage,
  ButtonStandard,
} from '../CustomCoreComponents';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const TaskExpand = ({description, progress, status, id}) => {
  const [visible, setVisible] = useState(false);
  // const [newProgress, setNewProgress] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const toggleOverlay = () => {
    setVisible(false);
    setErrMessage('');
    setNewProgress('');
  };

  const updateProgress = () => {
    // if (
    //   Number(newProgress) < 0 ||
    //   Number(newProgress) > 100 ||
    //   newProgress == ''
    // ) {
    //   setErrMessage('Progress must be a number from 0 to 100!');
    // } else {
    firestore()
      .collection('tasks')
      .doc(id)
      .update({
        status: newStatus,
      })
      .then(() => {
        setVisible(false);
        // setNewStatus('');
        // setErrMessage('');
      });
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <Text style={styles.title}>Status</Text>
        <Text style={styles.description}>{status}</Text>
        {/* <View style={styles.progressBlock}>
          <ProgressCircle
            percent={progress}
            radius={40}
            borderWidth={8}
            color={colors.primary}
            shadowColor={colors.secondary}
            bgColor="white">
            <Text style={styles.progress}>{progress}%</Text>
          </ProgressCircle>
        </View> */}
        <ButtonStandard
          title="details"
          onButtonPress={() => setVisible(true)}
        />
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{width: '90%', borderRadius: dimensions.borderRadius}}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          {status === 'Done' ? null : (
            <View>
              <Text style={styles.title}>Status</Text>
              <View style={styles.picker}>
                <Picker
                  enabled={status === 'Done' ? false : true}
                  selectedValue={newStatus}
                  onValueChange={(itemValue) => setNewStatus(itemValue)}>
                  <Picker.Item label="Doing" value="Doing" key="1" />
                  <Picker.Item label="Reviewing" value="Reviewing" key="2" />
                </Picker>
              </View>
              {/* {errMessage ? <ErrorMessage message={errMessage} /> : null} */}
              <ButtonStandard title="update" onButtonPress={updateProgress} />
            </View>
          )}
          {/* <InputStandard
            text={newProgress}
            setText={setNewProgress}
            placeholder="Enter new progress here..."
            isNumber
            elevation
          /> */}
        </View>
      </Overlay>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: dimensions.standardSpacing,
    marginHorizontal: '0.5rem',
    borderBottomLeftRadius: dimensions.borderRadius,
    borderBottomRightRadius: dimensions.borderRadius,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: dimensions.elevation,
  },
  title: {
    fontSize: '4rem',
    color: '#9B9B9B',
  },
  description: {
    marginVertical: '1rem',
    fontSize: '5rem',
  },
  progressBlock: {
    alignItems: 'center',
    marginTop: '4rem',
  },
  progress: {
    fontSize: '4.5rem',
  },
  overlay: {
    backgroundColor: 'white',
    margin: '3rem',
  },
  picker: {
    marginTop: '3rem',
    // marginHorizontal: '1rem',
    // marginBottom: '3rem',
    borderRadius: dimensions.borderRadius,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: dimensions.elevation8,
  },
});

export default TaskExpand;
