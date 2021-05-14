import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import logo from './images/logoAlpha.png';

const { width: WIDTH } = Dimensions.get('window');

export default function App() {
  return (
    <LinearGradient
    colors={['#FF00FF', '#AA00FF']}
    style={styles.backgroundContainer}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Nom d'utilisateur"}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'/>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder={"Nom d'utilisateur"}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundContainer :{
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center"
  },
  logo :{
    width: 200,
    height: 200
  },
  input :{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  inputIcon:{
    position:'absolute',
    top: 8,
    left: 37
  }
});