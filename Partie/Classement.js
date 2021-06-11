import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import MesDefis from '../Partie/MesDefis';

export default class Classement extends Component {
    constructor(props) {
      super(props);
      this.state = {
        joueur: [],
        show:null
      };
    }

    componentDidMount(){
      const tab=[
        {
          nom:"Maxime",
          points:1230
        },{
          nom:"Théo",
          points:1180
        },{
          nom:"Matys",
          points:1170
        },{
          nom:"Azyno",
          points:970
        },{
          nom:"Loulou",
          points:840
        },{
          nom:"Caillou",
          points:710
        }
      ];
      this.setState({
        joueur:this.props.users
      });
      console.log(this.props.users);
    }

    renderTrophy = (place) => {
      if(place>2){
        return (<Text style={styles.place}>{place+1}</Text>);
      }else{
        return(
          <Icon
              style={styles.trophy}
              name='trophy-outline'
              size={30}
              color={place==0?'goldenrod':(place==1?'silver':'brown')}></Icon>);
      }
    }

    renderJoueur = () => {
      return this.state.joueur.map((joueur) => {
          return (
            <TouchableOpacity 
              key={this.state.joueur.indexOf(joueur)}
              onPress={() => {this.setState({show:joueur.id})}}>
                <View style={styles.player}>
                    {this.renderTrophy(this.state.joueur.indexOf(joueur))}
                    <Text style={styles.label}>{joueur.name}</Text>
                    <Text style={styles.points}>{joueur.points} pts</Text>
                </View>
            </TouchableOpacity>
          );
      });
    }

    mesDefisBack = () => {
      this.setState({show:null});
    }

    render() {
        if(this.state.show!=null){
          return(<MesDefis users={this.props.users} defis={this.props.defis} back={() => {this.mesDefisBack()}} player={this.state.show} />);
        }else{
          return (
              <LinearGradient
                  colors={['#FF9200', '#FFEB00']}
                  style={styles.backgroundContainer}>
              <View style={styles.rond}></View>
              <View style={styles.rond2}></View>
              <View style={styles.topContainer}>
                  <TouchableOpacity
                      style={styles.inputIcon}
                      onPress={() => {this.props.back(0);}}>
                  <Icon 
                      name='chevron-back' 
                      size={30}
                      color='rgb(255,255,255)'></Icon>
                  </TouchableOpacity>
                  <Text style={styles.title}>Classement</Text>
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
                    {this.renderJoueur()}
                  </ScrollView>
              </View>
          <View style={styles.topContainer}></View>
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
    scrollView:{
      width: '100%'
    },
    inputIcon :{
      padding: 15
    },
    centerContainer:{
      width: '100%',
      flex:1,
      alignItems: "center",
      justifyContent:"center"
    },
    title:{
      fontSize: 26,
      color: '#fff',
      textShadowColor: "#000",
      textShadowOffset: {width: 1, height: 1},
      textShadowRadius: 1
    },
    player:{
      backgroundColor: '#fff',
      borderRadius: 10,
      marginHorizontal: 15,
      marginVertical: 5,
      paddingVertical: 5,
      minHeight: 65,
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },
    label:{
        width: '60%',
        marginLeft: 10,
        textAlign: 'center',
        fontSize: 26,
        color: '#000'
    },
    trophy:{
      marginLeft:10
    },
    points:{
      marginRight: 10,
      color:'#000'
    },
    place:{
      paddingLeft:15,
      fontSize:30,
      color:'#000'
    }
});