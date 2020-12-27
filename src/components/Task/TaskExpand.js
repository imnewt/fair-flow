import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Button, Overlay} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import Themes from '../../utils/Themes';
const {colors, dimensions} = Themes;

const TaskExpand = ({description, progress, id}) => {
  const [visible, setVisible] = useState(false);
  const [newProgress, setNewProgress] = useState('');
  const [err, setErr] = useState(false);

  const toggleOverlay = () => {
    setVisible(false);
    setErr(false);
    setNewProgress('');
  };

  const updateProgress = () => {
    if (
      Number(newProgress) < 0 ||
      Number(newProgress) > 100 ||
      newProgress == ''
    ) {
      setErr(true);
    } else {
      console.log(id);
      firestore()
        .collection('tasks')
        .doc(id)
        .update({
          progress: Number(newProgress),
        })
        .then(() => {
          setVisible(false);
          setNewProgress('');
          setErr(false);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Description</Text>
        <Text style={styles.description} numberOfLines={1}>
          {description}
        </Text>
        <View style={styles.progressBlock}>
          <ProgressCircle
            percent={progress}
            radius={40}
            borderWidth={8}
            color={colors.primary}
            shadowColor={colors.secondary}
            bgColor="white">
            <Text style={styles.progress}>{progress}%</Text>
          </ProgressCircle>
        </View>
        <Button
          title="details"
          titleStyle={styles.buttonText}
          buttonStyle={styles.button}
          onPress={() => setVisible(true)}
        />
      </View>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{width: '90%', borderRadius: 10}}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description}>{description}</Text>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Enter new progress here..."
            onChangeText={(newProgress) => setNewProgress(newProgress)}
            value={newProgress}
          />
          {err ? (
            <Text style={styles.error}>
              Progress must be an integer from 0 to 100!
            </Text>
          ) : null}
          <Button
            title="update"
            titleStyle={styles.buttonText}
            buttonStyle={styles.button}
            onPress={updateProgress}
          />
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
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 2,
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
  input: {
    backgroundColor: '#eee',
    marginTop: '3rem',
    height: '12rem',
    width: '100%',
    padding: '2rem',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 0},
    elevation: 1,
    fontSize: '4rem',
  },
  error: {
    color: colors.error,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '4rem',
  },
  button: {
    backgroundColor: colors.primary,
    marginTop: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: '3rem',
  },
  buttonText: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  overlay: {
    backgroundColor: 'white',
    margin: '3rem',
  },
});

export default TaskExpand;
