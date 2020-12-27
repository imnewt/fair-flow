import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';

import TasksStackScreen from './src/stacks/Tasks';
import RoomsStackScreen from './src/stacks/Rooms';
import SettingsStackScreen from './src/stacks/Settings';

import stores from './src/stores';
import {Provider} from 'mobx-react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import Themes from './src/utils/Themes';
const {colors} = Themes;

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 100});

LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Tasks') {
            iconName = 'ios-clipboard';
          } else if (route.name === 'Rooms') {
            iconName = 'ios-logo-windows';
          } else if (route.name === 'Settings') {
            iconName = 'ios-settings';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.tabInactiveColor,
        style: {
          height: 60,
          paddingBottom: 3,
        },
        labelStyle: {
          fontSize: 12,
        },
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Tasks" component={TasksStackScreen} />
      <Tab.Screen name="Rooms" component={RoomsStackScreen} />
      <Tab.Screen name="Settings" component={SettingsStackScreen} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
export default function App() {
  return (
    <Provider {...stores}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="Main" component={Main} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
