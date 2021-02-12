import React from 'react';

import{
    IonPage,
    IonContent
} from '@ionic/react'

import store from "../redux/store";

import BeautyHeader from '../components/BeautyHeader';
import BeautyComments from '../components/BeautyComments';

class Comments extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            role : store.getState().userAccount.role,
            userId : store.getState().userAccount.id
        }
    }

    render(){
        return(
            <IonPage>
                <BeautyHeader />
                <IonContent>
                    <BeautyComments type={this.state.role} identifier={this.state.userId} />
                </IonContent>
            </IonPage>
        );
    }
}

export default Comments;