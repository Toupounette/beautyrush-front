import React from 'react';

import {
    IonCard,
    IonItem,
    IonButton,
    IonCardContent,
    IonTitle,
    IonList
} from '@ionic/react'

class BeautyAccountsResult extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showToastError: false,
            showToastSuccess: false
        };
    }

    renderAccounts(){
        return this.props.searchResult.map((account) =>(
            <IonCard>
                <IonItem>
                    <IonTitle>{account.name}</IonTitle>
                </IonItem>
    
                <IonCardContent>
                    <IonButton color="primary" fill="outline" slot="end" onClick={() => {this.props.deleteAccount(account.ID, account.accountType)}}>Delete</IonButton>
              </IonCardContent>
            </IonCard>
        ));
    }

    render(){
        return(
            <>
                <IonTitle>Search account result</IonTitle>
                <IonList>
                    {this.renderAccounts()}
                </IonList>
            </>
        );
    }
}

export default BeautyAccountsResult;