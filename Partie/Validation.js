import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SplashScreen from '../Navigation/SplashScreen';

export default class Validation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        defis: [],
        loading:false
      };
      this.onRefuse.bind(this);
      this.onAccept.bind(this);
      this.idToDefi.bind(this);
    }

    waitingToTodo = async (defi) =>{
      this.setState({loading:true});
      const user = await firestore().collection('users').doc(defi.joueurId).get();
      let userData = user.data();
      let newWaiting = [];
      if(userData.waiting.length<=1){newWaiting==null}
      else{
        for (let index = 0; index < userData.waiting.length; index++) {
          if(userData.waiting[index]!=defi.id){newWaiting.push(userData.waiting[index]);}          
        }
      }
      let newTodo = userData.todo==null?[]:userData.todo;
      newTodo.push(defi.id);
      firestore()
        .collection('users')
        .doc(defi.joueurId)
        .update({
          todo: newTodo,
          waiting: newWaiting
        })
        .then(() => {
          console.log('User updated!');
          this.props.update(3);
        });
    }

    waitingToDid = async (defi) =>{
      this.setState({loading:true});
      const user = await firestore().collection('users').doc(defi.joueurId).get();
      let userData = user.data();
      let newWaiting = [];
      if(userData.waiting.length<=1){newWaiting==null}
      else{
        for (let index = 0; index < userData.waiting.length; index++) {
          if(userData.waiting[index]!=defi.id){newWaiting.push(userData.waiting[index]);}          
        }
      }
      let newDid = userData.did==null?[]:userData.did;
      newDid.push(defi.id);
      let defiPoints,compt = 0;
      newDid.forEach(element => {
        defiPoints = this.idToDefi(element);
        compt += defiPoints.points;
      });
      firestore()
        .collection('users')
        .doc(defi.joueurId)
        .update({
          points: compt,
          did: newDid,
          waiting: newWaiting
        })
        .then(() => {
          console.log('User updated!');
          this.props.update(3);
        });
    }


    /* Deny a defi */
    onRefuse = (defi) => {
      Alert.alert(
          "Refus de défi",
          "Souhaitez-vous refuser le defi de "+defi.joueur+" : "+defi.defi+" ?",
          [
            {
              text: "Non",
              onPress: () => console.log("Non"),
              style: "cancel"
            },
            { text: "Oui", onPress: () => this.waitingToTodo(defi) }
          ]
      );
    }

    /* Accept a defi */
    onAccept = (defi) => {
      Alert.alert(
          "Validation de défi",
          "Souhaitez-vous valider le defi de "+defi.joueur+" : "+defi.defi+" ?",
          [
            {
              text: "Non",
              onPress: () => console.log("Non"),
              style: "cancel"
            },
            { text: "Oui", onPress: () => this.waitingToDid(defi)}
          ]
      );
    }

    /* Renvoie un défi par rapport à son id */
    idToDefi = (id) => {
      if(this.props.defis != null){
        for (let index = 0; index < this.props.defis.length; index++) {
          if(this.props.defis[index].id == id){return(this.props.defis[index]);}
        }
      }
      return(null);
    }

    componentDidMount(){
      let myUid = auth().currentUser.uid;
      let defis = [];
      let defiInfo, defi;
      this.props.users.forEach(user =>{
        if(user.waiting!=null && user.id!=myUid){
          for (let index = 0; index < user.waiting.length; index++) {
            defi = user.waiting[index];
            defiInfo = this.idToDefi(defi);
            if(defiInfo == null){return;}
            defis.push({joueurId:user.id,joueur:user.name,defi:defiInfo.label,id:defi});
          }
        }
      });
      this.setState({
        defis: defis
      });
    }

    renderValidation = () => {
      if(this.state.defis.length == 0){
        return(<Text style={styles.nothing}>Il n'y a aucun défi à valider</Text>);
      }
      return this.state.defis.map((validation) => {
          return (
            <View style={styles.valid} key={this.state.defis.indexOf(validation)}>
                      <TouchableOpacity 
                        style={styles.react}
                        onPress={() => {this.onAccept(validation)}}>
                          <Icon
                              name='checkbox' 
                              size={25}
                              color='lime'></Icon>
                              <Text style={styles.actionName}>Accepter</Text>
                      </TouchableOpacity>
                      <View style={styles.infos}>
                          <Text style={styles.defi}>{validation.defi}</Text>
                          <Text style={styles.nom}>{validation.joueur}</Text>
                      </View>
                      <TouchableOpacity 
                        style={styles.react}
                        onPress={() => {this.onRefuse(validation)}}>
                          <Icon 
                              name='hand-left' 
                              size={25}
                              color='red'></Icon>
                            <Text style={styles.actionName}>Refuser</Text>
                      </TouchableOpacity>
                  </View>
          );
      });
    }
    
    render() {
      if(this.state.loading){return(<SplashScreen />)}
      else{
        return (
          <LinearGradient
          colors={['#FF9200', '#FFEB00']}
          style={styles.backgroundContainer}>
          <View style={styles.rond}></View>
          <View style={styles.rond2}></View>
          <View style={styles.topContainer}>
              <TouchableOpacity
                  style={styles.inputIcon}
                  onPress={() => {this.props.back();}}>
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
              <ScrollView 
                  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                  style={styles.scrollView}>
                  {this.renderValidation()}
              </ScrollView>
          </View>
          <View style={styles.botContainer}>
          </View>
        </LinearGradient>
        )
      }
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
    },
    scrollView:{
      width: '100%'
    },
    valid:{
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 15,
      marginVertical: 5,
      paddingVertical: 5,
      minHeight: 65,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    infos:{
        width: '60%',
        textAlign: 'center'
    },
    react:{
      paddingHorizontal:10,
      justifyContent: 'center',
      alignItems:'center',
      width:'20%',
    },
    actionName:{
      fontSize:13
    },
    nom:{
      fontSize:13,
      textAlign: 'center'
    },
    defi:{
      textAlign: 'center',
      color:'#000',
    },
    nothing:{
      textAlign: 'center',
      fontSize: 26,
      color: '#fff',
    }
});