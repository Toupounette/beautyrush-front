import React from 'react';

import { 
    IonCard, 
    IonItem,
    IonIcon,
    IonLabel,
    IonButton,
    IonCardContent
 } from '@ionic/react';

import { aperture } from 'ionicons/icons';

class BeautySearhcresult extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            searchResult: props.searchResult
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
        return this.state.searchResult.map((provider) =>(
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
            <>
            {this.renderSearchResult()}
            </>
        );
    }
}

export default BeautySearhcresult;