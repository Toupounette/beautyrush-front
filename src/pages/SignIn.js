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
    IonSelectOption,
    IonToast } from '@ionic/react';

import { connect } from 'react-redux';
import { userAccount } from '../redux/actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            accountType:"clients",
            errorToastMessage: "",
            showToastSuccess : false,
            showToastError : false };
    }
        
    connectAccount = (path, data) => {
        // Methode d'envoie de la requete : GET | POST | PUT | PATCH | DELETE
        let method = "POST";
    
        // XMLHttpRequest = classe js qui permet de creer des requetes http
        // new = permet de creer un objet de la classe
        var xhttp = new XMLHttpRequest();
    
        // URL de la requete contruite avec les donnees du fichier .env
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path + "/login";
    
        // false en à la fin pour rendre cette methode générale asynchrone synchrone
        xhttp.open(method, url, false);
    
        //Configuration du content-type de la requete.Les données de la requete sont en format JSON car c'est le format choisi dans mon API back (node.js)
        xhttp.setRequestHeader("Content-Type", "application/json");

        // Envoi de la requete de création de compte au serveur back
        xhttp.send(JSON.stringify(data));

        // On retourne le resultat de la requete de creation de compte
        return xhttp;
    }

    handleConnection = () => {    
        var email = (document.getElementById("email")  ).value;
        var password = (document.getElementById("password")  ).value;

       let connectAccountResponse = null;

        if (this.state.accountType === 'clients'){
            connectAccountResponse = this.connectAccount( '/clients', { 'email': email, 'password': password});
        }
        else if (this.state.accountType === 'providers'){
            connectAccountResponse = this.connectAccount( '/providers', {'email': email, 'password': password});
        } 
        
        switch(connectAccountResponse.status) {

            case 200 :
            {
                // Si la creation de comtpe c'est bien passee
                this.setState({ showToastSuccess : true });

                // On enregistre dans redux les information de connexion de l'utilisateur
                this.props.userAccount(JSON.parse(connectAccountResponse.responseText))

                // On redirige l'utilisateur vers la page de connexion
                //window.location.replace('/user');
                break;
            }
            case 401 :
            {
                this.setState({ showToastError : true, errorToastMessage : 'Invalid email or password'   });
                break;
            }
            default :
            {
                // S'il y a eu une erreur, on supprime les caracteres indesirables pour pouvoir afficher le message d'erreur
                let formatedMessage = connectAccountResponse
                                    .responseText
                                    .replaceAll("\"", "").replaceAll("\\", "");
                
                // on enregistre le message d'erreur dans le state pour que le toast d'erreur l'affiche
                this.setState({ showToastError : true, errorToastMessage : formatedMessage  });
            }
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
                            <div>
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
                            <IonToast color="success"
                            isOpen={this.state.showToastSuccess}
                            onDidDismiss={() => this.setState({ showToastSuccess : false })}
                            message="Welcome to your account"
                            duration={1000}
                            />
                            <IonToast color="danger"
                            isOpen={this.state.showToastError}
                            onDidDismiss={() => this.setState({ showToastError : false })}
                            message= {this.state.errorToastMessage}
                            duration={1000}
                            />
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
    {userAccount}
) (SignIn);







