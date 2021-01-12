import React from 'react';

import { 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar, 
    IonInput, 
    IonItem, 
    IonButton, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonSelect,
    IonSelectOption } from '@ionic/react';

import { connect } from 'react-redux';
import { createClientAccount, createProviderAccount} from '../redux/actions';

// import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountType:"clients" };
    }

    handleRegister = () => {    
        if (this.state.accountType === 'clients'){

            var name = (document.getElementById("name")  ).value;
            var firstname = (document.getElementById("firstname")  ).value;
            var email = (document.getElementById("email")  ).value;
            var password = (document.getElementById("password")  ).value;

            this.props.createClientAccount({ 'name': name, 'firstname': firstname, 'email': email, 'password': password});
        }
        else if (this.state.accountType === 'providers'){
            
            var name = (document.getElementById("name")  ).value;
            var address = (document.getElementById("address")  ).value;
            var email = (document.getElementById("email")  ).value;
            var password = (document.getElementById("password")  ).value;
            var registration_number = (document.getElementById("registration_number")  ).value;

            this.props.createProviderAccount({ 'name': name, 'address': address, 'email': email, 'password': password, 'registration_number': registration_number});
        }  
          
    };

    render (){
        return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BeautyRush</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow color="primary" justify-content-center>
                        <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
                            <div text-center>
                                <h3>Create your account!</h3>
                            </div>
                            <div>
                                <IonItem>
                                    <IonInput name="name" id="name" type="text" placeholder="Name" required></IonInput>
                                </IonItem>
                                {(this.state.accountType === "clients") && (
                                    <IonItem>
                                        <IonInput name="firstname" id="firstname" type="text" placeholder="Firstname" required></IonInput>
                                    </IonItem>
                                )}
                                {(this.state.accountType === "providers") && (
                                    <div>
                                    <IonItem>
                                        <IonInput name="address" id="address" type="text" placeholder="Address" required></IonInput>
                                    </IonItem>

                                    <IonItem>
                                        <IonInput name="registration_number" id="registration_number" type="text" placeholder="Registration number" required></IonInput>
                                    </IonItem>
                                    </div>
                                )}
                                <IonItem>
                                    <IonInput name="email" id="email" type="email" placeholder="your@email.com" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput name="password" id="password" type="password" placeholder="Password" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput name="confirm" type="password" placeholder="Password again" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonSelect value={ this.state.accountType } aria-required onIonChange={e => this.setState({ accountType: e.detail.value })}>
                                        <IonSelectOption value='clients'>Client</IonSelectOption>
                                        <IonSelectOption value='providers'>Provider</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                            <div>
                                <IonButton size="large" onClick={ this.handleRegister } expand="block">Register</IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
        );
    }
}

export default connect(
    null,
    { createClientAccount, createProviderAccount }
) (SignUp);




