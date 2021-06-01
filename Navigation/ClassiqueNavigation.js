import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Home from '../Partie/Home';
import Classement from '../Partie/Classement';
import MesDefis from '../Partie/MesDefis';
import Validation from '../Partie/Validation';


export default class ClassiqueNavigation extends Component {
    constructor(props){
        super(props);
          this.state ={
            page : 0
        };
        this.navigatePage.bind(this);
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
            default:
                return <Home changePage={(page) => {this.navigatePage(page)}}/>
                break;
        }
    }
}
