import { 
    IonCard, 
    IonSlides,
    IonSlide,
    IonItem,
    IonThumbnail,
    IonImg,
    IonLabel,
    IonButton,
    IonCardContent,
    IonContent,
    IonTitle,
    IonList
} from '@ionic/react';
import React from 'react';

class BeautyHome extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            slideoptions:{
                autoplay: true,
                speed: 400,
                spacebetween: 10
            }
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

    getHomeContent(){        
        const method = "GET";
        let xhttp = new XMLHttpRequest();
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/homecontent";
    
        xhttp.open(method, url, false);

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        const response = JSON.parse(xhttp.responseText); 
        return Object.entries(response);
    }

    renderHomeSlides(){
        const cards = this.getHomeContent();

        let slides = [];
        Object.entries(cards).forEach((card)=>{
            const provider = card[1][1];
            slides.push(
                <IonSlide>
                    <IonCard>
                        <IonItem>
                            <IonThumbnail>
                                <IonImg src={this.getImage()} />
                            </IonThumbnail>
                            <IonTitle>{provider.name}</IonTitle>
                            <IonButton fill="outline" slot="end" onClick={() => {this.handleViewProviderProfile(provider.ID)}}>Profile</IonButton>
                        </IonItem>
    
                <IonCardContent>
                    <IonImg src={this.getImage()} />
                </IonCardContent>
            </IonCard>
                </IonSlide>
            )
        });
        return slides;
    }

    renderHomeList(){
        const cards = this.getHomeContent();

        let slides = [];
        Object.entries(cards).forEach((card)=>{
            const provider = card[1][1];
            slides.push(
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
            )
        });
        return slides;        
    }

    render(){
        return(
            <>
                <IonTitle>Just joined Beauty Rush</IonTitle>
                <IonList>
                    {this.renderHomeList()}
                </IonList>
            </>
        );
    }
}

export default BeautyHome;