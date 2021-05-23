import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
//Follow this : https://rnfirebase.io/auth/usage

import Login from './Login/Login';
import Register from './Login/Register';
import Menu from './Menu/Menu';
import Home from './Partie/Home';
import MesDefis from './Partie/MesDefis';
import Classement from './Partie/Classement';
import Validation from './Partie/Validation';
import SplashScreen from './Login/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{headerShown: false}}
      initialRouteName="login">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
        />
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
  );
}