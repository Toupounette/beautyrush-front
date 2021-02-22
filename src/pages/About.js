import React from 'react';
import { 
    IonContent, 
    IonPage,
    IonTitle,
    IonImg,
    IonThumbnail
} from '@ionic/react';

import BeautyHeader from '../components/BeautyHeader';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <IonPage>
                <BeautyHeader />
              
               
               
                <IonContent>
                <IonImg width="50" height="50" class="logo" src='assets/img/logo512wobg.png' />
                <p> Acces to Beauty made Easy…</p>
                
                <p>Beauty Rush est une application qui met en relation des particuliers et des professionnels du domaine de l’esthétique….</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                </IonContent>
            </IonPage>
        );
    }
};

export default About;
