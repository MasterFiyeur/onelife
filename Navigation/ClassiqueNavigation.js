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

    /* TODO :
        - count points of player when validating a defi
        - loader when waiting firebase
        - game create and join
        - add name in register without special char
        - make an admin panel
    */

    /* ----- To reset my challenges -----
    let theTab = [];
    for (let index = 0; index < state_defis.length; index++) {
        const element = state_defis[index];
        theTab.push(element.id);
    }

    firestore()
        .collection('users')
        .doc("P7hITehYZ4b2Iq5xU1JTp08dakU2")
        .update({
            todo:theTab,
            waiting:null,
            did:null
        })
        .then(() => {
            console.log('User updated!');
            console.log(state_users);
        });*/

    actualisation = async (newPage) => {
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
            state_users.push({id:doc.id,game:data.game,name:data.name,points:data.points,todo:data.todo,did:data.did,waiting:data.waiting});
        });
        /* Updating state */
        this.setState({
            defis: state_defis,
            users: state_users,
            page: newPage
        });
        console.log("Updated !");
    }

    componentDidMount = () => {
        //this.actualisation(0);
        this.setState({
            users : [{"id":"P7hITehYZ4b2Iq5xU1JTp08dakU2","name":"Théo","points":0,"todo":["CfcRp4VgsnvGy7DZn1P8","MmeMgIZkBesBXC7RtYiH","Vsu7vS8BRwL1nyaIPutW","RyWSxXQ2n6ELL5B2uIwT","0peX5LA2ThSSyi6gdZ2c","G2hRHLR4ar5lYGowfcan","3w5PfRzpICTXm0jfnl94","4HZRpNbETH0HfQScfF7T","ILub7xMnJZYloSrDkh8H","D6fA1EaNiU62cIpz9cAg","JiecKNyMhT455gORZTKD","PAc9WmB5SjtGDGIBGYVf","WTTCxomLHAvtifArZ86B","p0LtV0DjpD1BZ23Df4I9","1UVznv3u8cOuMpUs9Vvp","89A2PQoizKkYhWu2u1kC","8sW3wvM4KYIklYpFedyw","bYD0BfAU1M7j8VLUnXaS","CVliBJ9BCZ8LgEfPaijL","lGqrKHJuoZQFa2LWLc4D","rBbHYC9CEyreu12sJj33","tPmIEGDzgzjf3OKJV69A","uoJVgZaRiuvv2ZDuebB8","dhH8W46ql56EE4yvELnT","Pp3S2ZYOy24xeyOJIc1E","hCi57WHaHabxzsSa1oKQ","ihKdz9bRBGhHffIwDRR8","nGaAMRJZnO56luyCDQtZ"],"did":null,"waiting":null}],
            defis : [{"id":"CfcRp4VgsnvGy7DZn1P8","label":"Avoir le snap/insta d'une meuf","points":1},{"id":"MmeMgIZkBesBXC7RtYiH","label":"Boire (en étant résonnable)","points":2},{"id":"Vsu7vS8BRwL1nyaIPutW","label":"Embrasser une personne en étant bourré","points":2},{"id":"RyWSxXQ2n6ELL5B2uIwT","label":"Embrasser une personne en étant sobre","points":3},{"id":"0peX5LA2ThSSyi6gdZ2c","label":"Faire un calin à un inconnue","points":4},{"id":"G2hRHLR4ar5lYGowfcan","label":"Pisser dans la rue","points":5},{"id":"3w5PfRzpICTXm0jfnl94","label":"Boire à la bouteille (5 gorgées mini)","points":6},{"id":"4HZRpNbETH0HfQScfF7T","label":"Choper le snap/insta de 10 meufs","points":10},{"id":"ILub7xMnJZYloSrDkh8H","label":"Prendre 10 shot d'affilé","points":10},{"id":"D6fA1EaNiU62cIpz9cAg","label":"Imiter une meuf pendant toute une soirée","points":15},{"id":"JiecKNyMhT455gORZTKD","label":"S'inventer une vie pour pécho une meuf","points":15},{"id":"PAc9WmB5SjtGDGIBGYVf","label":"Voler quelque chose","points":15},{"id":"WTTCxomLHAvtifArZ86B","label":"Faire une fausse demande en mariage à une inconnue","points":15},{"id":"p0LtV0DjpD1BZ23Df4I9","label":"Faire/Recevoir un suçon à une inconnue","points":15},{"id":"1UVznv3u8cOuMpUs9Vvp","label":"Michto une meuf","points":20},{"id":"89A2PQoizKkYhWu2u1kC","label":"S'incruster dans un groupe","points":20},{"id":"8sW3wvM4KYIklYpFedyw","label":"Boire et finir arraché","points":20},{"id":"bYD0BfAU1M7j8VLUnXaS","label":"Prendre 20 shot d'affilé","points":20},{"id":"CVliBJ9BCZ8LgEfPaijL","label":"Date une meuf","points":25},{"id":"lGqrKHJuoZQFa2LWLc4D","label":"Prêter son sweat à une meuf","points":30},{"id":"rBbHYC9CEyreu12sJj33","label":"Revoir une meuf le lendemain d'une soirée où t'étais totalement arraché","points":30},{"id":"tPmIEGDzgzjf3OKJV69A","label":"Courir à poil sur 100m","points":30},{"id":"uoJVgZaRiuvv2ZDuebB8","label":"Prendre une photo avec toutes les meufs que tu pécho","points":40},{"id":"dhH8W46ql56EE4yvELnT","label":"Aller chez une inconnue","points":45},{"id":"Pp3S2ZYOy24xeyOJIc1E","label":"Remplir l'alphabet de la chope","points":50},{"id":"hCi57WHaHabxzsSa1oKQ","label":"Faire des bails en extérieur","points":50},{"id":"ihKdz9bRBGhHffIwDRR8","label":"Bain de minuit (à poil ou sous-vêtements)","points":60},{"id":"nGaAMRJZnO56luyCDQtZ","label":"Plus que pécho une meuf (ken)","points":100}]
        });
    }

    navigatePage = (page) => {
        this.setState({page:page});
    }

    render() {
        switch (this.state.page) {
            case 1:
                return <MesDefis users={this.state.users} defis={this.state.defis} back={() => {this.navigatePage(0)}} player={"self"} update={(page) => {this.actualisation(page)}}/>
                break;
            case 2:
                return <Classement users={this.state.users} defis={this.state.defis} back={(page) => {this.navigatePage(page)}} />
                break;
            case 3:
                return <Validation users={this.state.users} defis={this.state.defis} back={() => {this.navigatePage(0)}} update={(page) => {this.actualisation(page)}}/>
                break;
            case -1:
                return <SplashScreen />
                break;
            default:
                return <Home users={this.state.users} changePage={(page) => {this.navigatePage(page)}} update={(page) => {this.actualisation(page)}}/>
                break;
            /* Add function "actualise" which is call everytime that the state is 0 (home)*/
        }
    }
}
