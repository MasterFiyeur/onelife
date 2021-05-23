import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import Login from '../Login/Login';
import Register from '../Login/Register';
import Menu from '../Menu/Menu';
import Home from '../Partie/Home';
import MesDefis from '../Partie/MesDefis';
import Classement from '../Partie/Classement';
import Validation from '../Partie/Validation';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return(
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
            name="register" 
            component={Register} 
            />
        </Stack.Navigator>
    );
};

const AppNavigation = () => {
    return(
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
      initialRouteName="menu">
        <Stack.Screen
          name="splash"
          component={SplashScreen}
        />
        <Stack.Screen 
          name="menu" 
          component={Menu} 
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
    );
};

export default function Navigation() {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    
    if (initializing) return <SplashScreen />;

  return (
    <NavigationContainer>
        {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}