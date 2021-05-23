import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';


/*
	Mes défis (défi,points,check?)
	Validation des défis
	Classement (clique sur joueur pour voir
		les défis)
		-> Pareil que Mes défis en non
			clickable
*/

export default class Home extends Component {
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
                    onPress={() => {auth().signOut().then(()=>{console.log("User signed out !");});}}>
                <Icon 
                    name='log-out-outline' 
                    size={30} 
                    color='rgb(255,255,255)'></Icon>
                </TouchableOpacity>
                <Text style={{fontSize:16}}>Partie : #12345</Text>
                <TouchableOpacity style={styles.inputIcon}>
                <Icon 
                    name='settings-outline' 
                    size={30} 
                    color='rgb(255,255,255)'></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{this.props.navigation.navigate('mesdefis')}}>
                    <Text style={styles.text}>Mes défis</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.btn}
                    onPress={()=>{this.props.navigation.navigate('classement')}}>
                    <Text style={styles.text}>Classement</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={()=>{this.props.navigation.navigate('validation')}}>
                    <Text style={styles.text}>Validation des défis</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.topContainer}></View>
        </LinearGradient>
        );
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
    centerContainer:{
      width: '100%',
      flex:1,
      alignItems: "center",
      justifyContent:"space-evenly"
    },
    btn :{
      width: '90%',
      minHeight: 60,
      borderRadius: 25,
      backgroundColor: 'rgb(255,255,255)',
      justifyContent: 'center',
      marginTop: 20
    },
    text:{
      fontSize:20,
      textAlign: "center"
    }
  });