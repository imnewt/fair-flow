import React from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
        activeTintColor: '#2ea7e0',
        inactiveTintColor: '#8D8E91',
        style: {
          // backgroundColor: "#383838",
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
            headerTitle: null,
            headerTransparent: true,
            headerTintColor: '#36413E',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 19,
              color: '#FFF',
            },
            headerBackImage: () => <Ionicons name="ios-arrow-back" size={25} />,
          }}>
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
