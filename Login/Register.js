import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import logo from '../images/logoAlpha.png';

const { width: WIDTH } = Dimensions.get('window');

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPass: true,
      press: false,
      username:"",
      password:"",
      passConf:""
    };
  }

  showPass = () => {
    if(this.state.press == false){
      this.setState({press: true,showPass:false});
    }else{
      this.setState({press: false,showPass:true});
    }
  }

  registerVerif = () => {
    Keyboard.dismiss();
    alert("tkt200");
  }

  render(){
  return (
    <LinearGradient colors={['#FF00FF', '#AA00FF' ]} style={styles.backgroundContainer}>
      <View >
          <TouchableOpacity style={styles.backChevron} onPress={() => {this.props.navigation.navigate('login');}}>
            <Icon name='chevron-back' size={35} color='rgba(255,255,255,1)'></Icon>
          </TouchableOpacity>
      </View>
      <View style={styles.backgroundCenter}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={this.state.passIncorrect?{display:'flex'}:{display:'none'}}>
          <Text>Mot de passe incorrect.</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={(text)=>{this.setState({username:text});}}
            defaultValue={this.state.username}
            style={styles.input}
            placeholder={"Adresse mail"}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'/>
            <Icon name='person-circle-outline' size={28} color='rgba(255,255,255,0.7)' style={styles.inputIcon}></Icon>
        </View>
        <View style={styles.inputContainer}>
        {/*<DateTimePicker
          testID="dateTimePicker"
          mode="date"
          value={this.state.date}
          display="default"
          onChange={this.onChange.bind(this)}
        />*/}
        </View>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={(text)=>{this.setState({password:text});}}
            defaultValue={this.state.password}
            style={styles.input}
            placeholder={"Mot de passe"}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'/>
            <Icon name='lock-closed' size={26} color='rgba(255,255,255,0.7)' style={styles.inputIcon}></Icon>
            <TouchableOpacity style={styles.inputIcon2} onPress={this.showPass.bind(this)}>
              <Icon name={this.state.press==false ? 'eye' : 'eye-off' } size={26} color='rgba(255,255,255,0.7)'></Icon>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={(text)=>{this.setState({passConf:text});}}
            defaultValue={this.state.passConf}
            style={styles.input}
            placeholder={"Confirmation mot de passe"}
            secureTextEntry={this.state.showPass}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'/>
            <Icon name='lock-closed' size={26} color='rgba(255,255,255,0.7)' style={styles.inputIcon}></Icon>
        </View>
        <TouchableOpacity style={styles.btnReg} onPress={this.registerVerif}>
          <Text style={styles.text}>S'enregistrer</Text>
        </TouchableOpacity>
      </View>
      <View></View>
    </LinearGradient>
  );}
}

const styles = StyleSheet.create({
  backgroundContainer :{
    flex: 1,
    width: null,
    height: null
  },
  backgroundCenter :{
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    marginBottom:50
  },
  backgroundTop :{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  backChevron:{
    paddingTop: 15,
    paddingLeft: 15,
    width: 50
  },
  logo :{
    width: 200,
    height: 200
  },
  logoContainer :{
    marginBottom: 50
  },
  input :{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 16,
    paddingHorizontal: 45,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  inputIcon:{
    position:'absolute',
    top: 8,
    left: 37
  },
  inputIcon2:{
    position:'absolute',
    top: 8,
    right: 37
  },
  inputContainer :{
    marginBottom: 10
  },
  btnLogin :{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    marginTop: 20
  },
  btnReg :{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    marginTop: 5
  },
  text :{
    color:'rgba(255,255,255,0.7)',
    textAlign: 'center',
    fontSize: 16
  }
});