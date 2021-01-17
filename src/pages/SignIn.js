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
import { connectToClientAccount, connectToProviderAccount} from '../redux/actions';



class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { accountType:"clients" };
    }

    handleConnection = () => {    
        var email = (document.getElementById("email")  ).value;
        var password = (document.getElementById("password")  ).value;

        if (this.state.accountType === 'clients'){
            this.props.connectToClientAccount({ 'email': email, 'password': password});
        }
        else if (this.state.accountType === 'providers'){
            this.props.connectToProviderAccount({'email': email, 'password': password});
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
                                <h3>Connect yourself!</h3>
                            </div>
                            <div>
                                <IonItem>
                                    <IonInput name="email" id="email" type="email" placeholder="your@email.com" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput name="password" id="password" type="password" placeholder="Password" required></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonSelect value={ this.state.accountType } aria-required onIonChange={e => this.setState({ accountType: e.detail.value })}>
                                        <IonSelectOption value='clients'>Client</IonSelectOption>
                                        <IonSelectOption value='providers'>Provider</IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                            </div>
                            <div>
                                <IonButton size="large" onClick={ this.handleConnection } expand="block">Connection</IonButton>
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
    { connectToClientAccount, connectToProviderAccount }
) (SignIn);






