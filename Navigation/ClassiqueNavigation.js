import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from '../Partie/Home';
import Classement from '../Partie/Classement';
import MesDefis from '../Partie/MesDefis';
import Validation from '../Partie/Validation';
import SplashScreen from '../Navigation/SplashScreen';


export default class ClassiqueNavigation extends Component {
    constructor(props){
        super(props);
          this.state ={
            page : 0,
            users: null,
            defis:null
        };
        this.navigatePage.bind(this);
        this.actualisation.bind(this);
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    actualisation = async () => {
        this.setState({page:-1});
        console.log("Wait !");
        await this.sleep(3000);
        console.log("Update !");
        this.setState({page:0});
    }

    navigatePage = (page) => {
        this.setState({page:page});
    }

    render() {
        switch (this.state.page) {
            case 1:
                return <MesDefis back={() => {this.navigatePage(0)}} />
                break;
            case 2:
                return <Classement back={() => {this.navigatePage(0)}}/>
                break;
            case 3:
                return <Validation back={() => {this.navigatePage(0)}}/>
                break;
            case -1:
                return <SplashScreen />
                break;
            default:
                return <Home changePage={(page) => {this.navigatePage(page)}} update={() => {this.actualisation()}}/>
                break;
            /* Add case -1 for initialisation of defis and users */
            /* Add function "actualise" which is call everytime that the state is 0 (home)*/
        }
    }
}
