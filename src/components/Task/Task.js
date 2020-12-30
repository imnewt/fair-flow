import React, {useEffect, useState} from 'react';
import {Text, View, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {mix, bin, useTransition} from 'react-native-redash';
import EStyleSheet from 'react-native-extended-stylesheet';
import firestore from '@react-native-firebase/firestore';
import Chevron from './Chevron';
import TaskExpand from './TaskExpand';
import Themes from '../../utils/Themes';
const {dimensions} = Themes;
const {not, interpolate} = Animated;

const Task = ({task}) => {
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState('');

  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease),
  );
  const height = mix(
    transition,
    0,
    (Dimensions.get('window').width / 100) * 65,
  );

  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0],
  });

  useEffect(() => {
    const subscriber = firestore()
      .collection('rooms')
      .doc(task.roomId)
      .onSnapshot((querySnapshot) => setRoomName(querySnapshot.data().name));
    return () => subscriber();
  }, []);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius,
            },
          ]}>
          <View style={styles.taskName}>
            <Text style={styles.name}>{task.name}</Text>
            <Chevron {...{transition}} />
          </View>
          <Text style={styles.info}>{roomName}</Text>
          <Text style={styles.info}>{task.deadline}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.expand, {height}]}>
        <TaskExpand
          description={task.description}
          progress={task.progress}
          id={task.id}
        />
      </Animated.View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    marginTop: '4rem',
    marginHorizontal: '0.5rem',
    backgroundColor: 'white',
    padding: dimensions.standardSpacing,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 60,
    elevation: 2,
  },
  taskName: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: '5.5rem',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    flexShrink: 1,
  },
  info: {
    fontSize: '4rem',
    marginTop: '1rem',
    color: 'black',
  },
  expand: {
    overflow: 'hidden',
  },
});

export default Task;
