import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partieID:"",
    }
  }

  render(){
  return (
    <LinearGradient
      colors={['#FF00FF', '#AA00FF']}
      style={styles.backgroundContainer}>
      <View style={styles.topContainer}>
        <TouchableOpacity style={styles.inputIcon}>
          <Icon 
            name='log-out-outline' 
            size={30} 
            color='rgb(255,255,255)'></Icon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.inputIcon}>
          <Icon 
            name='settings-outline' 
            size={30} 
            color='rgb(255,255,255)'></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.centerContainer}>
        <TouchableOpacity 
          style={styles.btn}>
          <Text style={styles.text}>Créer une partie</Text>
        </TouchableOpacity>
        <View style={styles.join}>
          <View style={styles.inputID}>
            <Icon 
              name='add-circle-outline' 
              size={35} 
              color='rgb(255,255,255)' 
              style={styles.inputIcon}></Icon>
            <TextInput
              onChangeText={(text)=>{this.setState({partieID:text});}}
              defaultValue={this.state.partieID}
              style={styles.input}
              placeholder={"#12345"}
              maxLength={6}
              placeholderTextColor={'rgb(255,255,255)'}
              underlineColorAndroid='transparent'/>
          </View>
          <TouchableOpacity 
            style={styles.btn}>
            <Text style={styles.text}>Rejoindre une partie</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.topContainer}></View>
    </LinearGradient>
  );}
}

const styles = StyleSheet.create({
  backgroundContainer :{
    flex: 1,
    width: '100%',
    minHeight: '100%',
    flex:1,
    alignItems: "center",
    justifyContent: "space-between"
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
  centerContainer:{
    width: '100%',
    flex:1,
    alignItems: "center",
    justifyContent:"space-evenly"
  },
  btn :{
    width: '90%',
    height: 60,
    borderRadius: 25,
    backgroundColor: 'rgba(0,255,145,0.85)',
    justifyContent: 'center',
    marginTop: 20
  },
  text:{
    fontSize:20,
    textAlign: "center"
  },
  join :{
    width: '100%',
    alignItems: "center"
  },
  inputID:{
    marginBottom: 10,
    flexDirection: "row",
    borderColor:"#fff",
    borderRadius: 25,
    borderWidth: 2,
    paddingHorizontal:20,
  },
  input:{
    fontSize: 30
  },
});