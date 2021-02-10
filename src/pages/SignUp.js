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
    IonToast
     } from '@ionic/react';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            accountType:"clients",
            errorToastMessage: "",
            showToastSucces: false,
            showToastInvalidEmail: false,
            showToastInvalidPassword: false,
            showToastError: false 
        };
    }

    createAccount(path, data){
        // Methode d'envoie de la requete : GET | POST | PUT | PATCH | DELETE
        const method = "POST";
    
        // XMLHttpRequest = classe js qui permet de creer des requetes http
        // new = permet de creer un objet de la classe
        var xhttp = new XMLHttpRequest();
    
        // URL de la requete contruite avec les donnees du fichier .env
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
    
        // false en à la fin pour rendre cette methode générale asynchrone synchrone
        xhttp.open(method, url, false);
    
        //Configuration du content-type de la requete.Les données de la requete sont en format JSON car c'est le format choisi dans mon API back (node.js)
        xhttp.setRequestHeader("Content-Type", "application/json");

        // Envoi de la requete de création de compte au serveur back
        xhttp.send(JSON.stringify(data));

        // On retourne le resultat de la requete de creation de compte
        return xhttp;
    }

    handleRegister(){    
        var name = (document.getElementById("name")  ).value;
        var email = (document.getElementById("email")  ).value;
        var password = (document.getElementById("password")  ).value;

        let createAccountResponse = null;

        if (this.state.accountType === 'clients'){
            var firstname = (document.getElementById("firstname")  ).value;

            createAccountResponse = this.createAccount( '/clients', { 'name': name, 'firstname': firstname, 'email': email, 'password': password});
        }
        else if (this.state.accountType === 'providers'){
            var address = (document.getElementById("address")  ).value;
            var registration_number = (document.getElementById("registration_number")  ).value;

            createAccountResponse = this.createAccount( '/providers', { 'name': name, 'address': address, 'email': email, 'password': password, 'registration_number': registration_number});
        }  

        switch(createAccountResponse.status) {
            case 200 :
            {
                // Si la creation de comtpe c'est bien passee
                this.setState({ showToastSuccess : true });
                // On redirige l'utilisateur vers la page de connexion
                window.location.replace('/signIn');
                break;
            }
            default :
            {
                // S'il y a eu une erreur, on supprime les caracteres indesirables pour pouvoir afficher le message d'erreur
                let formatedMessage = createAccountResponse
                                    .responseText
                                    .replaceAll("\"", "").replaceAll("\\", "");
                
                // on enregistre le message d'erreur dans le state pour que le toast d'erreur l'affiche
                this.setState({ showToastError : true, errorToastMessage : formatedMessage });   
            }                     
        }
    };

    render (){
        return (
        <IonPage>
            <IonContent>
                <IonGrid>
                    <IonRow color="primary" justify-content-center>
                        <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
                            <div >
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
                            <IonToast color="success"
                            isOpen={this.state.showToastSuccess}
                            onDidDismiss={() => this.setState({ showToastSuccess : false })}
                            message="Your account has been created"
                            duration={1000}
                            />
                            <IonToast color="danger"
                            isOpen={this.state.showToastError}
                            onDidDismiss={() => this.setState({ showToastError : false })}
                            message={this.state.errorToastMessage}
                            duration={2000}
                            />
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

export default SignUp;






