import React from 'react';

import { 
    IonContent,  
    IonPage, 
    IonInput, 
    IonItem, 
    IonButton, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonSelect,
    IonSelectOption,
    IonToast } from '@ionic/react';
    
import BeautyHeader from '../components/BeautyHeader';

class ForgottenPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: "clients",
            toastErrorMessage:'Invalid email for this account type',
            showToastSuccess : false,
            showToastError : false
        };
    }

    updatePassword(data){
        const method = "POST";
        let xhttp = new XMLHttpRequest();
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT +"/"+ this.state.accountType + "/forgottenpassword";

        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        try {
            xhttp.send(JSON.stringify(data));
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }
        
        return xhttp;
    }

    handleResetPassword(){
        const email = (document.getElementById("email")  ).value;        
        const updatePasswordResponse = this.updatePassword({email});
        switch(updatePasswordResponse.status) {
            case 200 :
            {
                this.setState({ showToastSuccess : true  });
                break;
            }
            default :
            {                
                this.setState({showToastError: true, toastErrorMessage: "Invalid email for this account type"});
            }
        }
    }

    render (){
        return (
            <IonPage>
            <BeautyHeader/>
                <IonContent>
                    <IonGrid>
                        <IonRow color="primary" justify-content-center>
                            <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
                                <div>
                                    <h3>Rush here to update your password</h3>
                                </div>
                                <div>
                                    <IonItem>
                                        <IonInput id="email" name="email" type="email" placeholder="your@mail.com" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                    <IonSelect value={ this.state.accountType } aria-required onIonChange={e => this.setState({ accountType: e.detail.value })}>
                                        <IonSelectOption value='clients'>Client</IonSelectOption>
                                        <IonSelectOption value='providers'>Provider</IonSelectOption>
                                    </IonSelect>
                                    </IonItem>
                                </div>
                                <div>
                                <IonToast color="success"
                                isOpen={this.state.showToastSuccess}                                
                                onDidDismiss={() => {
                                    this.setState({ showToastSuccess : false });
                                    window.location.replace('/signIn');
                                }}
                                message="Your new password has been sent to your email"
                                duration={2000}
                                />
                                <IonToast color="danger"
                                isOpen={this.state.showToastError}
                                onDidDismiss={() => this.setState({ showToastError : false })}
                                duration={2000}
                                message={this.state.toastErrorMessage}
                                />
                                <IonButton size="large" onClick={ ()=>{ this.handleResetPassword() } } expand="block">Reset Password</IonButton>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }

}

export default ForgottenPassword;