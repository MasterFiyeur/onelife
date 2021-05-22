import React, { Component } from 'react';
import {StyleSheet ,View, Image } from 'react-native';
import logo from '../images/logoAlpha.png';

export default class SplashScreen extends Component {
    render(){
        return(
            <View style={styles.backgroundContainer}>
                <Image source={logo} style={styles.logo}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    backgroundContainer :{
      flex: 1,
      width: null,
      height: null,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#A600FF'
    },
    logo :{
      width: 200,
      height: 200
    }
  });
