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

import store from '../redux/store';

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            role: store.getState().userAccount.role,
            identifier: store.getState().userAccount.id,
            token : store.getState().userAccount.token,
            accountData : null,
            showToastSuccess : false,
            showToastError : false,
            toastErrorMessage: 'An error occured. Please try later'
        };
    }

    updatePassword(data){
        const method = "POST";
        let xhttp = new XMLHttpRequest();
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT +"/"+ this.state.role + 's/'+ this.state.identifier + "/updatepassword";

        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }
        
        try {
            xhttp.send(JSON.stringify(data));
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return xhttp;       
    }

    handlePassword(){
        const email = (document.getElementById("email")  ).value;
        const current_password = (document.getElementById("current_password")  ).value;
        const new_password = (document.getElementById("new_password")  ).value;
        const confirm_new_password = (document.getElementById("confirm_new_password")  ).value;

        const updateData = {
            email: email,
            currentPassword: current_password,
            newPassword: new_password,
            newPasswordConfirm: confirm_new_password
        };
        
        const updatePasswordResponse = this.updatePassword(updateData);

        switch(updatePasswordResponse.status) {
            case 200 :
            {
                this.setState({ showToastSuccess : true });
                break;
            }
            default :
            {
                const formatedMessage = updatePasswordResponse
                .responseText
                .replaceAll("\"", "").replaceAll("\\", "");

                this.setState({ showToastError : true, toastErrorMessage : formatedMessage.trim() === '' ? 'An error occured. Please try later' : formatedMessage })
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
                                        <IonInput name="current password" id="current_password" type="password" placeholder="Current Password" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name="new password" id="new_password" type="password" placeholder="New Password" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name="confirm new password" id="confirm_new_password" type="password" placeholder="Confirm New Password" required></IonInput>
                                    </IonItem>
                                </div>

                                <div>
                                <IonToast color="success"
                                isOpen={this.state.showToastSuccess}                                
                                onDidDismiss={() => {
                                    this.setState({ showToastSuccess : false });
                                }}
                                message="Your password has been updated"
                                duration={2000}
                                />
                                <IonToast color="danger"
                                isOpen={this.state.showToastError}
                                onDidDismiss={() => this.setState({ showToastError : false })}
                                duration={2000}
                                message={this.state.toastErrorMessage}
                                />
                                <IonButton size="large" onClick={ ()=>{ this.handlePassword() } } expand="block">Update Password</IonButton>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        )
    }

}











export default UpdatePassword;