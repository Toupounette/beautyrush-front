import React from 'react';

import { 
    IonContent, 
    IonPage,
    IonSlide,
    IonSlides,
    IonItem,
    IonIcon,
    IonLabel,
    IonGrid,
    IonCol,
    IonRow,
    IonTitle,
    IonText,
    IonAvatar,
    IonImg
} from '@ionic/react';

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

    getProviderServices(){
        const method = "GET";    
        var xhttp = new XMLHttpRequest();    
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id + "/services";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);        
    }

    getProviderInfo(){
        const method = "GET";
        var xhttp = new XMLHttpRequest();
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id;
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);         
    }

    getProviderContent(){
        let info = this.getProviderInfo()[0];
        let services = this.getProviderServices();

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
        return (<BeautyScheduler type="providers" identifier={this.state.info.ID} />);
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
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <IonTitle>Overwies</IonTitle>
                                    {this.renderOveriew()}
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonTitle>Services</IonTitle>
                                    {this.renderServices()}
                                </IonCol>
                                <IonCol >
                                    {this.renderScheduler()}
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    <IonTitle>Comments</IonTitle>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonItem>
                </IonContent>
            </IonPage>
        )
    }
}

export default Provider;