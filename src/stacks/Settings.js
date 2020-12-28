import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import SettingsScreen from '../screens/Settings';
import ProfileScreen from '../screens/Profile';
import PasswordScreen from '../screens/Password';
import PolicyScreen from '../screens/Policy';
import SupportScreen from '../screens/Support';
import AboutScreen from '../screens/About';

const SettingsStack = createStackNavigator();
export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        // headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} color="#FFF"/>,
      }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
      <SettingsStack.Screen name="Password" component={PasswordScreen} />
      <SettingsStack.Screen name="Policy" component={PolicyScreen} />
      <SettingsStack.Screen name="Support" component={SupportScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
}
