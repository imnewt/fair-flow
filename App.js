import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EStyleSheet from 'react-native-extended-stylesheet';
import stores from './src/stores';
import {Provider} from 'mobx-react';

import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import TasksStackScreen from './src/stacks/Tasks';
import RoomsStackScreen from './src/stacks/Rooms';
import SettingsStackScreen from './src/stacks/Settings';

import Themes from './src/utils/Themes';
const {colors, dimensions} = Themes;

EStyleSheet.build({$rem: dimensions.screenWidth / 100});
// LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;
          if (route.name === 'Tasks') {
            iconName = 'clipboard';
          } else if (route.name === 'Rooms') {
            iconName = 'layers';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return (
            <Ionicons
              name={iconName}
              color={color}
              size={dimensions.tabIconSize}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.tabInactiveColor,
        style: {
          height: dimensions.tabHeight,
          paddingBottom: dimensions.tabPadding,
        },
        labelStyle: {
          fontSize: dimensions.tabTitleSize,
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
          initialRouteName="Login"
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
