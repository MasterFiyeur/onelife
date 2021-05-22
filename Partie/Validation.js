import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Validation extends Component {
    constructor(props) {
      super(props);
      this.state = {
        defis: []
      };
    }

    componentDidMount(){
      const defis = [
        {
          joueur:'Matys',
          defi:"Revoir une meuf le lendemain d'une soirée où t'étais totalement arraché"
        },{
          joueur:'Théo',
          defi:"S'inventer une vie pour pécho une meuf"
        },{
          joueur:'Maxime',
          defi:"Courir à poil sur 100m"
        }
      ];
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
                      <TouchableOpacity style={styles.react}>
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
                      <TouchableOpacity style={styles.react}>
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