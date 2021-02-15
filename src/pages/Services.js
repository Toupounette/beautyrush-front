import React from 'react';

import {
    IonPage,
    IonContent
} from '@ionic/react';

import store from "../redux/store";

import BeautyServices from "../components/BeautyServices";
import BeautyHeader from '../components/BeautyHeader';

class Services extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role : store.getState().userAccount.role,
            identifier : store.getState().userAccount.id
        }
    }

    render(){
        return(
            <IonPage>
                <BeautyHeader/>
                <IonContent>
                    <BeautyServices role={this.state.role} identifier={this.state.identifier} />
                </IonContent>
            </IonPage>
        );
    }
}

export default Services;