import React from 'react';

import store from '../redux/store';

import { 
    IonContent, 
    IonPage 
} from '@ionic/react';

import BeautyAccount from '../components/BeautyAccount';
import BeautyHeader from '../components/BeautyHeader';

class Account extends React.Component{
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
                    <BeautyAccount role={this.state.role} identifier={this.state.userId} />
                </IonContent>
            </IonPage>
        );
    }
}

export default Account;