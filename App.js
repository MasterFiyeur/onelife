import 'react-native-gesture-handler';

import React, { Component } from 'react';
import { Text } from 'react-native';
import Login from './Login/Login';
import Register from './Login/Register';
import Menu from './Menu/Menu';
import Home from './Partie/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MesDefis from './Partie/MesDefis';
import Classement from './Partie/Classement';
import Validation from './Partie/Validation';

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
        <Stack.Screen 
          name="register" 
          component={Register} 
        />
        <Stack.Screen 
          name="home" 
          component={Home}
        />
        <Stack.Screen 
          name="mesdefis" 
          component={MesDefis}
        />
        <Stack.Screen 
          name="classement" 
          component={Classement}
        />
        <Stack.Screen 
          name="validation" 
          component={Validation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );}
}