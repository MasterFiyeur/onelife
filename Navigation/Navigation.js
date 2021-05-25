import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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

const ClassiqueNavigation = (props) => {
  return(
    <Stack.Navigator
      headerMode='none'
      screenOptions={{headerShown: false}}
      initialRouteName="home">
        <Stack.Screen 
          name="home" 
          component={Home}
          initialParams={{game:props.game}}
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
}

const CreateNavigation = () => {
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
    </Stack.Navigator>
    );
}

const SplashNavigation = (props) => {
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={SplashScreen}
      />
  </Stack.Navigator>

}

const AppNavigation = (props) => {
    const [game, setGame] = useState(null);
    const [load, setLoad] = useState(false);
    
    doAFunction = () => {
      console.log("Yolo");
      setGame({
        mode:"classique",
        user:[
          {uid:12,name:"Theo"},
          {uid:13,name:"Maxime"}
        ]
      });
      setLoad(true);
    }

    if(!load) {
      doAFunction();
      return null;
    }
    return(
      game ? 
        (game.mode == "classique" ? <ClassiqueNavigation game={game}/> : 
        <CreateNavigation />) :
          <SplashScreen />
        
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

    /* L'affichage dépend de {game} donc voir comment gerer les games
    faire un listener de l'état de game du joueur
    Peut-être pré-creer les games avec un id et création quand une avec joueur null */
    
    if (initializing) return <SplashScreen />;

  return (
    <NavigationContainer>
        {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}