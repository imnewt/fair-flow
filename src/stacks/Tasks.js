import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TasksScreen from '../screens/Tasks';

const TasksStack = createStackNavigator();
export default function TasksStackScreen() {
  return (
    <TasksStack.Navigator
      initialRouteName="Tasks"
      screenOptions={{headerShown: false}}>
      <TasksStack.Screen name="Tasks" component={TasksScreen} />
    </TasksStack.Navigator>
  );
}
