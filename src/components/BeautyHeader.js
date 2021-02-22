import React from 'react';
import { 
    IonHeader,
    IonToolbar,
    IonRow,
    IonImg,
    IonMenuButton,
    IonButton,
    IonThumbnail,
    IonItem
 } from '@ionic/react';

class BeautyHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <IonHeader class="beautyheader">
                <IonToolbar>  
                    <IonRow>
                        <IonMenuButton/>
                                                  
                        <IonThumbnail>                         
                            <IonImg class="logo" src='assets/img/logo512wobg.png' />
                        </IonThumbnail>
                    </IonRow>
                </IonToolbar>
            </IonHeader>
        );
    }
}

export default BeautyHeader;


