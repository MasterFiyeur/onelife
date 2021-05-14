import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';

export default class Menu extends Component {
  constructor(props) {
    super(props);

  }

  render(){
  return (
    <View style={styles.backgroundContainer}>
      <Text>Yolo</Text>
    </View>
  );}
}

const styles = StyleSheet.create({
  backgroundContainer :{
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#FFFFFF'
  }
});