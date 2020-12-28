import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import RoomsScreen from '../screens/Rooms';
import RoomDetailScreen from '../screens/RoomDetail';

const RoomsStack = createStackNavigator();
export default function RoomsStackScreen() {
  return (
    <RoomsStack.Navigator
      initialRouteName="Rooms"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        // headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
      }}>
      <RoomsStack.Screen name="Rooms" component={RoomsScreen} />
      <RoomsStack.Screen name="RoomDetail" component={RoomDetailScreen} />
    </RoomsStack.Navigator>
  );
}
