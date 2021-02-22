import React from 'react';

import { 
    IonCard, 
    IonItem,
    IonImg,
    IonLabel,
    IonButton,
    IonCardContent,
    IonList,
    IonThumbnail,
    IonTitle
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
                    <IonThumbnail>
                        <IonImg src={this.getImage()} />
                    </IonThumbnail>
                    <IonTitle>{provider.name}</IonTitle>
                    </IonItem>
    
                <IonCardContent>
                    <IonButton fill="outline" slot="end" onClick={() => {this.handleViewProviderProfile(provider.ID)}}>Profile</IonButton>
              </IonCardContent>
            </IonCard>
        ));
    }

    getImage(){        
        const method = "GET";
        let xhttp = new XMLHttpRequest();
        const url = "https://picsum.photos/500";
    
        xhttp.open(method, url, false);

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return xhttp.responseURL; 
    }

    render(){
        return(
            <>
                <IonTitle>Search result</IonTitle>
                <IonList>
                    {this.renderSearchResult()}
                </IonList>
            </>
        );
    }
}

export default BeautySearhcresult;
