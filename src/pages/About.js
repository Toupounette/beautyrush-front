import React from 'react';
import { 
    IonContent, 
    IonPage
} from '@ionic/react';

import BeautyHeader from '../components/BeautyHeader';

class About extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <IonPage>
                <BeautyHeader />
                <IonContent>
                    This is the about page.
                </IonContent>
            </IonPage>
        );
    }
};

export default About;