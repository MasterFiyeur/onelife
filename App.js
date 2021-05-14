import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Text } from 'react-native';
import Login from './Login/Login';
import Menu from './Menu/Menu';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class App extends Component {
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown: false}}
      initialRouteName="login">
        <Stack.Screen
          name="login"
          component={Login}
        />
        <Stack.Screen 
          name="menu" 
          component={Menu} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );}
}