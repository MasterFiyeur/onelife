import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Validation extends Component {
    render() {
        return (
          <LinearGradient
          colors={['#FF9200', '#FFEB00']}
          style={styles.backgroundContainer}>
          <View style={styles.rond}></View>
          <View style={styles.rond2}></View>
          <View style={styles.topContainer}>
              <TouchableOpacity
                  style={styles.inputIcon}
                  onPress={() => {this.props.navigation.navigate('home');}}>
              <Icon 
                  name='chevron-back' 
                  size={30}
                  color='rgb(255,255,255)'></Icon>
              </TouchableOpacity>
              <Text style={styles.title}>Validation</Text>
              <TouchableOpacity style={styles.inputIcon}>
              <Icon 
                  name='settings-outline' 
                  size={30} 
                  color='rgb(255,255,255)'></Icon>
              </TouchableOpacity>
          </View>
          <View style={styles.centerContainer}>
              <ScrollView style={{width:'100%'}}>

              </ScrollView>
          </View>
          <View style={styles.botContainer}>
          </View>
        </LinearGradient>
        )
    }
}


const styles = StyleSheet.create({
    backgroundContainer :{
      flex: 1,
      width: null,
      height: null,
      justifyContent: "center",
      alignItems: "center"
    },
    rond:{
      backgroundColor: '#FF9200',
      position: 'absolute',
      height: 500,
      width: 500,
      bottom: -30,
      right: -200,
      borderRadius: 500,
    },
    rond2:{
      backgroundColor: '#FFF700',
      position: 'absolute',
      height: 200,
      width: 200,
      top: 20,
      left: 10,
      borderRadius: 500,
    },
    topContainer :{
      width: '100%',
      minHeight: 60,
      maxHeight: 60,
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    inputIcon :{
      padding: 15
    },
    title:{
        fontSize: 26,
        color: '#fff',
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    centerContainer:{
      width: '100%',
      flex:1,
      alignItems: "center",
      justifyContent:"space-evenly"
    }
});