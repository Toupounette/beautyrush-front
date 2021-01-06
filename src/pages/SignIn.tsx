import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonButton, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react';
import './SignIn.css';

// c'est pas la bonne page il faut échanger et mettre tout ça dans le signup =  s'inscrire
const SignIn: React.FC = () => {

    const createClientAccount = (params: any) => {
        let ip = "192.168.1.13";
        let port = "8080";
        let schema = "http";
        let path = "/clients";
        let method = "POST";
        var xhttp = new XMLHttpRequest();
        // false en à la fin pour rendre cette methode générale asynchrone synchrone
        let url = schema+"://"+ip+":"+port+path;
        console.log(url);
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            console.log('toto');
            }
        };
        xhttp.send(JSON.stringify(params));
    };
    
    const [accountType, setAccountType] = useState<string>('client');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>BeautyRush</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form>
                    <IonGrid>
                        <IonRow color="primary" justify-content-center>
                            <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
                                <div text-center>
                                    <h3>Create your account!</h3>
                                </div>
                                <div>
                                    <IonItem>
                                        <IonInput name="name" type="text" placeholder="Name" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name="email" type="email" placeholder="your@email.com" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name="password" type="password" placeholder="Password" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonInput name="confirm" type="password" placeholder="Password again" required></IonInput>
                                    </IonItem>
                                    <IonItem>
                                        <IonSelect value={ accountType } aria-required onIonChange={e => setAccountType(e.detail.value)}>
                                            <IonSelectOption value='clients'>Client</IonSelectOption>
                                            <IonSelectOption value='providers'>Provider</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                </div>
                                <div>
                                    <IonButton size="large" onClick={() => createClientAccount({'name':'toto','firstname':'titi', 'email':'toti.toto@mail.com'})} expand="block">Register</IonButton>
                                </div>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </form>
            </IonContent>
        </IonPage >
    )
}

export default SignIn;