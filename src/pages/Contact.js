import React from 'react';
import { 
    IonContent, 
    IonPage,
    IonTitle,
    IonImg,
    IonThumbnail
} from '@ionic/react';

import BeautyHeader from '../components/BeautyHeader';

class Contact extends React.Component{
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
                    <a href="mailto:contactbeautyrushapp@gmail.com">Contact Beauty Rush services</a>
                </IonContent>                
            </IonPage>
        );
    }
};

export default Contact;
