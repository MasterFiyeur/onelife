import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

import logo from '../images/logoAlpha.png';

const { width: WIDTH } = Dimensions.get('window');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      username:"",
      password:"",
      passIncorrect:""
    };
  }

  showPass = () => {
    if(this.state.press == false){
      this.setState({press: true,showPass:false});
    }else{
      this.setState({press: false,showPass:true});
    }
  }

  loginVerif = () => {
    Keyboard.dismiss();
    /* Enlever les espace lors de l'envoie du mail */
    if(this.state.username.trim() != "" && this.state.password.trim() != ""){
      auth()
      .signInWithEmailAndPassword(this.state.username.trim(),this.state.password)
      .then(() => {
        console.log("Authentifié !");
      })
      .catch((error) =>{
        if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
          this.setState({passIncorrect:"Mauvais mot de passe !"});
        }else if (error.code === 'auth/invalid-email'){
          this.setState({passIncorrect:"Adresse email invalide !"});
        }else{
          this.setState({passIncorrect:"Une erreur s'est produite !"});
        }
        console.log(error.code)
      });
    }else{
      this.setState({passIncorrect:"Champs vide(s) !"});
    }
  }

  render(){
  return (
    <LinearGradient
    colors={['#FF00FF', '#AA00FF']}
    style={styles.backgroundContainer}>
      <View style={styles.rond}></View>
      <View style={styles.rond2}></View>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
      </View>
      {this.state.passIncorrect != "" && 
        <View>
            <Text>{this.state.passIncorrect}</Text>
        </View>
      }
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text)=>{this.setState({username:text});}}
          defaultValue={this.state.username}
          style={styles.input}
          placeholder={"Adresse mail"}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'/>
          <Icon 
            name='mail' 
            size={28} 
            color='rgba(255,255,255,0.7)' 
            style={styles.inputIcon}></Icon>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={(text)=>{this.setState({password:text});}}
          defaultValue={this.state.password}
          style={styles.input}
          placeholder={"Mot de passe"}
          secureTextEntry={this.state.showPass}
          placeholderTextColor={'rgba(255,255,255,0.7)'}
          underlineColorAndroid='transparent'/>
          <Icon
            name='lock-closed' 
            size={26} 
            color='rgba(255,255,255,0.7)' 
            style={styles.inputIcon}></Icon>
        <TouchableOpacity style={styles.inputIcon2}
          onPress={this.showPass.bind(this)}>
          <Icon
            name={this.state.press == false ? 'eye' : 'eye-off'}
            size={26} 
            color='rgba(255,255,255,0.7)'
            ></Icon>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
      style={styles.btnLogin}
      onPress={this.loginVerif.bind(this)}>
        <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      style={styles.btnReg}
      onPress={() => {this.props.navigation.navigate('register');}}>
        <Text style={styles.text}>S'enregistrer</Text>
      </TouchableOpacity>
    </LinearGradient>
  );}
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
  },
  rond:{
    backgroundColor: '#FF00FE',
    position: 'absolute',
    height: 500,
    width: 500,
    bottom: -30,
    right: -200,
    borderRadius: 500,
  },
  rond2:{
    backgroundColor: '#BE00FF',
    position: 'absolute',
    height: 200,
    width: 200,
    top: -20,
    left: -10,
    borderRadius: 500,
  }
});