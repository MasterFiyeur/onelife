import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default class MesDefis extends Component {
    constructor(props) {
        super(props);
        this.state = {
          defis: [],
          user: null,
          total: 0
        };
        this.getUser.bind(this);
        this.idToDefi.bind(this);
        this.indexOfDefi.bind(this);
        this.todoToWaiting.bind(this);
    }

    /* Renvoi un user par rapport à son uid */
    getUser = (userUid) => {
        if(this.props.users != null){
            for (let index = 0; index < this.props.users.length; index++) {
                if(this.props.users[index].id == userUid){return(this.props.users[index]);}
            }
        }
        return(null);
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

    indexOfDefi = (tab,id) => {
        console.log(id);
        for (let index = 0; index < tab.length; index++) {
            if(tab[index] == id){return(index);}            
        }
        return(-1);
    }

    todoToWaiting = (defi_id) => {
        let user = this.getUser(this.props.player=="self"?auth().currentUser.uid:this.props.player);
        let newTodo = [];
        let newWaiting = user.waiting==null?[]:user.waiting;
        newWaiting.push(defi_id);
        newTodo = user.todo;
        let indexDel = this.indexOfDefi(newTodo,defi_id);
        if(indexDel==-1){alert("Erreur : [MesDefis->todoToWaiting] Défi non trouvé !");}
        newTodo.splice(newTodo.indexOf(defi_id),1);
        if(newTodo.length<=0){newTodo=null;}
        firestore()
            .collection('users')
            .doc(user.id)
            .update({
                todo:newTodo,
                waiting:newWaiting
            })
            .then(() => {
                console.log('User updated!');
                this.props.update(1);
            });
    }

    onClickDefi = (defi_id,label) => {
        Alert.alert(
            "Défi réalisé",
            "Souhaitez-vous demander la validation de ce défi : "+label+" ?",
            [
              {
                text: "Non",
                onPress: () => console.log("Non"),
                style: "cancel"
              },
              { text: "Oui", onPress: () => this.todoToWaiting(defi_id) }
            ]
        );
    }

    componentDidMount = () => {
        /* Creation of defis tab */
        let defis = [];
        let defi = null;
        let user = this.getUser(this.props.player=="self"?auth().currentUser.uid:this.props.player);
        if(user == null){this.props.back();return;}
        if(user.todo != null){
            user.todo.forEach(element =>{
                defi = this.idToDefi(element);
                defis.push({id:element,label:defi.label,points:defi.points,status:"todo"});
            });
        }
        if(user.did != null){
            user.did.forEach(element =>{
                defi = this.idToDefi(element);
                defis.push({id:element,label:defi.label,points:defi.points,status:"did"});
            });
        }
        if(user.waiting != null){
            user.waiting.forEach(element =>{
                defi = this.idToDefi(element);
                defis.push({id:element,label:defi.label,points:defi.points,status:"waiting"});
            });
        }
        /* sort the array */
        defis.sort((a,b)=>{return(a.points-b.points)});

        let compt = 0;
        defis.forEach(element => {
            compt += element.status=="did"?element.points:0;
        });
        this.setState({
            defis:defis,
            user:user,
            total:compt
        });
    }



    renderDefi = () => {
        return this.state.defis.map((defi) => {
            /* TouchableOpacity if didn't did */
            if(defi==null){return;}
            if(defi.status=="todo" && this.props.player=="self"){
                return (
                    <TouchableOpacity 
                        key={this.state.defis.indexOf(defi)}
                        onPress={() => this.onClickDefi(defi.id,defi.label)}>
                        <View style={styles.defi}>
                            <Text style={styles.label}>{defi.label}</Text>
                            <View style={styles.info}>
                                <Icon 
                                    name='close-circle-outline'
                                    size={30}
                                    color='red'></Icon>
                                <Text>{defi.points} pts</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            }else{
                return (
                    <View style={styles.defi} 
                    key={this.state.defis.indexOf(defi)}>
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
                );
            }
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