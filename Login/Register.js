import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, Image, TouchableOpacity, Keyboard,SafeAreaView,ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

import logo from '../images/logoAlpha.png';

const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get("window");

export default class Register extends Component {
  constructor(props) {
    super(props);

    var dateMax = new Date(); 
    dateMax.setFullYear(dateMax.getFullYear() - 18);
    this.state = {
      showPass: true,
      press: false,
      username:"",
      password:"",
      passConf:"",
      date: new Date("2000-01-01"),
      dateMax:dateMax,
      dateText:"01/01/2000",
      show: false,
      validMail:true,
      validDate:true,
      validMDP:true,
    };
  }

  changeDate = (event, date) => {
    if(event.type=="set"){
      let text = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear();
      this.setState({
        date:date,
        show:false,
        dateText: text
      });
    }
  }

  showPass = () => {
    if(this.state.press == false){
      this.setState({press: true,showPass:false});
    }else{
      this.setState({press: false,showPass:true});
    }
  }

  registerVerif = () => {
    let valid = true;
    Keyboard.dismiss();
    if(this.state.password != this.state.passConf || this.state.password.length < 8){
      valid= false;
      this.setState({validMDP:false});
    }else{
      this.setState({validMDP:true});
    }
    if(this.state.date>=this.state.dateMax || this.state.date<=new Date(1950,0,1)){
      valid = false;
      this.setState({validDate:false});
    }else{
      this.setState({validDate:true});
    }
    let regex = /\S+@\S+\.\S+/;
    if(!regex.test(String(this.state.username).toLowerCase())){
        valid=false;
        this.setState({validMail:false});
    }else{
      this.setState({validMail:true});
    }
    if(valid){
      alert("registered");
    }
  }

  render(){
  return (
    <SafeAreaView style={styles.backgroundContainer}>
    <LinearGradient colors={['#FF00FF', '#AA00FF' ]} style={styles.backgroundContainer}>
      <View >
          <TouchableOpacity style={styles.backChevron} onPress={() => {this.props.navigation.navigate('login');}}>
            <Icon name='chevron-back' size={35} color='rgba(255,255,255,1)'></Icon>
          </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.backgroundCenter}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.inputContainer}>
            <TextInput onChangeText={(text)=>{this.setState({username:text});}}
              defaultValue={this.state.username}
              style={[styles.input,!this.state.validMail?{borderColor: "red",borderWidth: 1}:""]}
              placeholder={"Adresse mail"}
              placeholderTextColor={'rgba(255,255,255,0.7)'}
              underlineColorAndroid='transparent'/>
              <Icon name='person-circle-outline' size={28} color='rgba(255,255,255,0.7)' style={styles.inputIcon}></Icon>
          </View>
          <TouchableOpacity style={{marginBottom:10}} onPress={()=>{this.setState({show:true})}}>
              {this.state.show && <DateTimePicker
                mode="date"
                value={this.state.date}
                minimumDate={new Date(1950,0,1)}
                onChange={this.changeDate.bind(this)}
                maximumDate={this.state.dateMax}
              />}
              <Text style={[styles.inputDate,,!this.state.validDate?{borderColor: "red",borderWidth: 1}:""]}>
                {this.state.dateText}
              </Text>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput onChangeText={(text)=>{this.setState({password:text});}}
              defaultValue={this.state.password}
              style={[styles.input,!this.state.validMDP?{borderColor: "red",borderWidth: 1}:""]}
              placeholder={"Mot de passe (8 caractères)"}
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
              style={[styles.input,!this.state.validMDP?{borderColor: "red",borderWidth: 1}:""]}
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
      </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );}
}

const styles = StyleSheet.create({
  backgroundContainer :{
    flex: 1,
    width: null,
    height: null,
  },
  backgroundCenter :{
    flex: 1,
    width: null,
    height: null,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 25
  },
  backgroundTop :{
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  backChevron:{
    paddingVertical: 15,
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
  inputDate:{
    width: WIDTH - 55,
    height: 45,
    borderRadius: 45,
    fontSize: 18,
    backgroundColor:'rgba(0,0,0,0.35)',
    color:'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
    textAlign: "center",
    paddingTop: 10
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