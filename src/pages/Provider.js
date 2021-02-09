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
    IonRow
} from '@ionic/react';

import { aperture } from 'ionicons/icons';

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

    getProviderServices = () =>{
        let method = "GET";    
        var xhttp = new XMLHttpRequest();    
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id + "/services";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);        
    }

    getProviderInfo = () =>{
        let method = "GET";
        var xhttp = new XMLHttpRequest();
        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id;
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        xhttp.send();

        return JSON.parse(xhttp.responseText);         
    }

    getProviderContent = () =>{
        let info = this.getProviderInfo()[0];
        let services = this.getProviderServices();

        console.log("info = ", info);
        console.log("services = ", services);

        this.setState({
            info: info,
            services: services
        });
    }

    componentDidMount = () =>{
        this.getProviderContent();
    }

    renderSlides = () =>{
        //return this.state.services.map((service) => (
        //    <IonSlide>
        //        {service.title}
        //    </IonSlide>
        //));
    }

    render(){
        return(
            <IonPage>
                <IonContent>                    
                    <IonItem>
                        <IonIcon icon={aperture} slot="start" />
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
                                    Avis
                                </IonCol>
                                <IonCol>
                                    agenda
                                </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol>
                                    presta
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