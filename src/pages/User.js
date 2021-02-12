import React from 'react';

import {
    IonPage,
    IonContent,
    IonGrid, 
    IonCol,
    IonButton,
    IonRow,
    IonModal
} from '@ionic/react';

import store from "../redux/store";

import BeautyHeader from '../components/BeautyHeader';
import BeautyComments from '../components/BeautyComments';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModalAccount: false,
            showModalComments: false,
            showModalSchedule: false,
            showModalPortfolio: false,
            showModalServices: false,
            showModalAdminComments: false,
            showModalAdminClientsAccount: false,
            showModalAdminProvidersAccount: false,
            role : store.getState().userAccount.role,
            userId : store.getState().userAccount.id
        };
    }

    render (){
        return (
           <IonPage>
           <BeautyHeader />
               <IonContent>
                   Va voir le menu
               </IonContent>
           </IonPage>
        )

    }
    
}

export default User;