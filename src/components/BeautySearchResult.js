import React from 'react';

import { 
    IonCard, 
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonCardContent,
    IonList
 } from '@ionic/react';

import { aperture } from 'ionicons/icons';



class BeautySearhcresult extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        };        
    }
    handleViewProviderProfile(providerId){
        let element = document.createElement('a');
        element.setAttribute("href", "/provider/"+providerId);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    renderSearchResult(){
        return this.props.searchResult.map((provider) =>(
            <IonCard>
                <IonItem>
                    <IonIcon icon={aperture} slot="start" />
                    <IonLabel>{provider.name}</IonLabel>
                    <IonButton fill="outline" slot="end" onClick={() => {this.handleViewProviderProfile(provider.ID)}}>Profile</IonButton>
              </IonItem>
    
                <IonCardContent>
                    {provider.address}
                </IonCardContent>
            </IonCard>
        ));
      }

    render(){
        return(
            <IonList>
            {this.renderSearchResult()}
            </IonList>
        );
    }
}

export default BeautySearhcresult;
