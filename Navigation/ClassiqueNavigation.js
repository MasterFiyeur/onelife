import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from '../Partie/Home';
import Classement from '../Partie/Classement';
import MesDefis from '../Partie/MesDefis';
import Validation from '../Partie/Validation';
import SplashScreen from '../Navigation/SplashScreen';
import firestore from '@react-native-firebase/firestore';


export default class ClassiqueNavigation extends Component {
    constructor(props){
        super(props);
          this.state ={
            page : 0,
            users: null,
            defis: null
        };
        this.navigatePage.bind(this);
        this.actualisation.bind(this);
    }

    actualisation = async () => {
        /* Loading */
        this.setState({page:-1});
        /* Update defis */
        const defis = await firestore().collection('defis').orderBy('points','asc').get();
        let state_defis = [];
        defis.forEach(function(doc) {
            let data = doc.data();
            state_defis.push({id:doc.id,label:data.label,points:data.points});
        });
        /* Update users */
        const users = await firestore().collection('users').orderBy('points','desc').get();
        let state_users = [];
        users.forEach(function(doc) {
            let data = doc.data();
            state_users.push({id:doc.id,name:data.name,points:data.points,todo:data.todo,did:data.did,waiting:data.waiting});
        });
        /* Updating state */
        this.setState({
            defis:state_defis,
            users: state_users,
            page:0
        });
        console.log("Updated !");
    }

    componentDidMount = () => {
        //this.actualisation();
    }

    navigatePage = (page) => {
        this.setState({page:page});
    }

    render() {
        switch (this.state.page) {
            case 1:
                return <MesDefis users={this.state.users} defis={this.state.defis} back={() => {this.navigatePage(0)}} />
                break;
            case 2:
                return <Classement users={this.state.users} defis={this.state.defis} back={() => {this.navigatePage(0)}}/>
                break;
            case 3:
                return <Validation users={this.state.users} defis={this.state.defis} back={() => {this.navigatePage(0)}}/>
                break;
            case -1:
                return <SplashScreen />
                break;
            default:
                return <Home users={this.state.users} changePage={(page) => {this.navigatePage(page)}} update={() => {this.actualisation()}}/>
                break;
            /* Add case -1 for initialisation of defis and users */
            /* Add function "actualise" which is call everytime that the state is 0 (home)*/
        }
    }
}
