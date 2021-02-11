import React from 'react';
import { 
    IonHeader,
    IonToolbar,
    IonTitle,
    IonRow,
    IonImg,
    IonMenuButton,
    IonButton
 } from '@ionic/react';

class BeautyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <>
            <IonHeader>
                <IonToolbar>  
                    <IonRow>
                        <IonMenuButton/>
                        <IonTitle>BeautyRush</IonTitle>   
                        <IonButton shape="round" fill="clear" href="/">                            
                            <IonImg src='assets/logo192.png' />
                        </IonButton>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
            </>
        );
    }
}

export default BeautyHeader;