import React, { Component } from 'react';
import Headerroomrenting from "./roomrenting/headerroomrenting";
import Sliderroomrenting from "./roomrenting/roomrentingcontentarea";
import Roomrenting1content from "./roomrenting/roomrenting1content";
import Roomrentingtwocontentarea from "./roomrenting/roomrenting2contentarea";
//import Roomrentingthreecontentarea from "./roomrenting/roomrenting3contentarea";
import Footer from './footer/footer';
import App from '../App';


class MarketRoommates extends Component{
    render(){
        return(
            <div>
                <Headerroomrenting />
                <Sliderroomrenting />
                <div className="container" style={{width:"87%"}}>
                <Roomrenting1content />
                 
                </div>
                <Footer />
                MarketRoommates
            </div>
        )
    }
}

export default MarketRoommates;