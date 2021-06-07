import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MesDefis extends Component {
    constructor(props) {
        super(props);
        this.state = {
          defis: [],
          total: 0
        };
    }

    componentDidMount = () => {
        const defis = [
            {
                label: "Avoir le snap/insta d'une meuf",
                points: 1,
                status: "waiting"
            },
            {
                label: "Embrasser une personne en étant bourré",
                points: 2,
                status: "todo"
            },
            {
                label: "Embrasser une personne en étant sobre",
                points: 3,
                status: "waiting"
            },
            {
                label: "Faire un calin à un inconnue",
                points: 4,
                status: "did"
            },
            {
                label: "Boire (en étant résonnable)",
                points: 2,
                status: "waiting"
            },
            {
                label: "Boire à la bouteille (5 gorgées mini)",
                points: 6,
                status: "todo"
            },
            {
                label: "Prendre 10 shot d'affilé",
                points: 10,
                status: "waiting"
            },
            {
                label: "Prendre 20 shot d'affilé",
                points: 20,
                status: "did"
            },
            {
                label: "Michto une meuf",
                points: 20,
                status: "waiting"
            },
            {
                label: "Voler quelque chose",
                points: 15,
                status: "did"
            },
            {
                label: "Date une meuf",
                points: 25,
                status: "todo"
            },
            {
                label: "Faire/Recevoir un suçon à une inconnue",
                points: 15,
                status: "waiting"
            },
            {
                label: "S'incruster dans un groupe",
                points: 20,
                status: "did"
            },
            {
                label: "Choper le snap/insta de 10 meufs",
                points: 10,
                status: "waiting"
            },
            {
                label: "Imiter une meuf pendant toute une soirée",
                points: 15,
                status: "todo"
            },
            {
                label: "S'inventer une vie pour pécho une meuf",
                points: 15,
                status: "did"
            },
            {
                label: "Prêter son sweat à une meuf",
                points: 30,
                status: "did"
            },
            {
                label: "Revoir une meuf le lendemain d'une soirée où t'étais totalement arraché",
                points: 30,
                status: "did"
            },
            {
                label: "Aller chez une inconnue",
                points: 45,
                status: "did"
            },
            {
                label: "Remplir l'alphabet de la chope",
                points: 50,
                status: "waiting"
            },
            {
                label: "Courir à poil sur 100m",
                points: 30,
                status: "did"
            },
            {
                label: "Pisser dans la rue",
                points: 5,
                status: "did"
            },
            {
                label: "Boire et finir arraché",
                points: 20,
                status: "did"
            },
            {
                label: "Bain de minuit (à poil ou sous-vêtements)",
                points: 60,
                status: "did"
            },
            {
                label: "Faire une fausse demande en mariage à une inconnue",
                points: 15,
                status: "did"
            },
            {
                label: "Prendre une photo avec toutes les meufs que tu pécho",
                points: 40,
                status: "did"
            },
            {
                label: "Faire des bails en extérieur",
                points: 50,
                status: "did"
            },
            {
                label: "Plus que pécho une meuf (ken)",
                points: 100,
                status: "did"
            }
        ];
        let compt = 0;
        defis.forEach(element => {
            compt += element.status=="did"?element.points:0;
        });
        this.setState({
            defis:defis,
            total:compt
        })
    }

    renderDefi = () => {
        return this.state.defis.map((defi) => {
            /* TouchableOpacity if didn't did */
            return (
                <TouchableOpacity key={this.state.defis.indexOf(defi)}>
                    <View style={styles.defi}>
                        <Text style={styles.label}>{defi.label}</Text>
                        <View style={styles.info}>
                            <Icon 
                                name={defi.status=="did"?'checkmark-circle-outline':
                                    (defi.status=="waiting"?'hourglass-outline':'close-circle-outline')}
                                size={30}
                                color={defi.status=="did"?'lime':(defi.status=="waiting"?'orange':'red')}></Icon>
                            <Text>{defi.points} pts</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        });
    }

    render(){
        return(
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
                <Text style={styles.title}>Mes défis</Text>
                <TouchableOpacity style={styles.inputIcon}>
                <Icon 
                    name='settings-outline' 
                    size={30} 
                    color='rgb(255,255,255)'></Icon>
                </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
                <ScrollView style={{width:'100%'}}>
                    {this.renderDefi()}
                </ScrollView>
            </View>
            <View style={styles.botContainer}>
                <Text style={styles.total}>Total : {this.state.total} pts</Text>
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
    defi:{
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        paddingVertical: 5,
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label:{
        width: '80%',
        marginLeft: 10
    },
    info:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    botContainer :{
      width: '100%',
      minHeight: 60,
      maxHeight: 60,
      flex:1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    total:{
        fontSize: 30,
        color: '#fff',
        textShadowColor: "#000",
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    }
});