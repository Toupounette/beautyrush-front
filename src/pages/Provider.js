import React from 'react';

import { 
    IonContent, 
    IonPage,
    IonSlide,
    IonSlides,
    IonItem,
    IonIcon,
    IonLabel,
    IonTitle,
    IonText,
    IonAvatar,
    IonImg
} from '@ionic/react';

import store from "../redux/store";

import { aperture } from 'ionicons/icons';

import BeautyScheduler from '../components/BeautyScheduler';
import BeautyHeader from '../components/BeautyHeader';

class Provider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            avatar : '', // icon contact | aperture
            id: props.match.params.id,
            slideoptions:{
                initialSlide: 1,
                speed: 400
            },
            info : {},
            services : [],
            comments : [],
            schedule : null
        }
    }

    isClientToProvider(){
        const role = store.getState().userAccount.role;
        return (role === 'client');
    }

    getProviderServices(){
        const method = "GET";    
        let xhttp = new XMLHttpRequest();    
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id + "/services";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);        
    }

    getProviderInfo(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id;
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);         
    }

    getProviderContent(){
        const info = this.getProviderInfo()[0];
        const services = this.getProviderServices();

        this.setState({
            info: info,
            services: services
        });
    }

    componentWillMount(){
        this.getProviderContent();
    }

    renderSlides(){
        return this.state.services.map((service) => (
            <IonSlide>
                {service.title}
            </IonSlide>
        ));
    }

    renderServices(){
        return this.state.services.map((service) =>(
            <IonLabel>{service.title} | {service.price} €</IonLabel>
        ));
    }

    renderScheduler(){
        return (
            <BeautyScheduler 
                role="provider" 
                identifier={this.state.info.ID} 
                clientToProvider={this.isClientToProvider()} 
                providerServices={this.state.services}
                providerInfo={this.state.info}
                calendarType="clientSearchResult"
            />);
    }

    renderOveriew(){
        return(<IonText>{this.state.info.overview}</IonText>);
    }

    renderAvatar(){
        if(this.state.info.avatar !== null && this.state.info.avatar.trim() === "")
        {
            return(
            <IonAvatar>
                <IonImg src={this.state.info.avatar} />
            </IonAvatar>);
        }
        else
        {
            return(<IonIcon icon={aperture} slot="start" />);
        }
    }

    render(){
        return(
            <IonPage>
            <BeautyHeader />
                <IonContent>                    
                    <IonItem>
                        {this.renderAvatar()}
                        <IonLabel>{this.state.info.name}</IonLabel>
                        <IonLabel>{this.state.info.address}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonSlides pager={true} options={this.state.slideoptions}>
                            {this.renderSlides()}
                        </IonSlides>
                    </IonItem>
                <IonItem>  
                                    <IonTitle>Overview</IonTitle>
                                    {this.renderOveriew()}
                </IonItem> 
                <IonItem>  
                                    <IonTitle>Services</IonTitle>
                                    {this.renderServices()}
                </IonItem>   
                <IonContent>  
                                    {this.renderScheduler()}
                </IonContent>  
                <IonItem>  
                                    <IonTitle>Comments</IonTitle>
                </IonItem>  

                </IonContent>
            </IonPage>
        )
    }
}

export default Provider;