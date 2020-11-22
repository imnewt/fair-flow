import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { mix, bin, useTransition } from 'react-native-redash';
import Chevron from './Chevron';
import TaskExpand, { LIST_ITEM_HEIGHT } from './TaskExpand'
import EStyleSheet from 'react-native-extended-stylesheet'

const { not, interpolate } = Animated;

const Task = ({ task }) => {
  const [open, setOpen] = useState(false);
  const transition = useTransition(
    open,
    not(bin(open)),
    bin(open),
    400,
    Easing.inOut(Easing.ease),
  );

  const height = mix(transition, 0, LIST_ITEM_HEIGHT);

  const bottomRadius = interpolate(transition, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  })

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            },
          ]}
        >
          <View style={styles.line}>
            <Text style={styles.name}>{task.name}</Text>
            <Chevron {...{transition}} />
          </View>
          <Text style={styles.info}>{task.roomName}</Text>
          <Text style={styles.info}>{task.deadline}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, {height}]}>
        <TaskExpand description={task.description} progress={task.progress}/>
      </Animated.View>
    </View>
  )
}

const styles = EStyleSheet.create({
  container: {
    marginTop: "4rem",
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  line: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  name: {
    fontSize: "5.5rem",
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  info: {
    fontSize: "4rem",
    marginTop: "1rem",
    color: "#000"
  },
  items: {
    overflow: 'hidden',
  }
})

export default Task