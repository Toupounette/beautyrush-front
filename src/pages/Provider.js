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
    IonImg,
    IonToast,
    IonList,
    IonCard,
    IonCardHeader,
    IonTextarea,
    IonButton,
    IonCardContent
} from '@ionic/react';

import store from "../redux/store";

import { aperture } from 'ionicons/icons';

import BeautyScheduler from '../components/BeautyScheduler';
import BeautyHeader from '../components/BeautyHeader';
import BeautyComments from '../components/BeautyComments';


class Provider extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            avatar : '', // icon contact | aperture
            id: props.match.params.id,
            slideoptions:{
                autoplay: true,
                speed: 400,
                spacebetween: 10
            },
            info : {},
            services : [],
            portfolios : [],
            comments : [],
            schedule : null,
            showToastError: false,
            toastErrorMessage: ''
        }
    }

    isClientToProvider(){
        const role = store.getState().userAccount.role;
        return (role === 'client');
    }

    getProviderPortfolios(){
        const method = "GET";    
        let xhttp = new XMLHttpRequest();    
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id + "/portfolios";
    
        xhttp.open(method, url, false);

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return JSON.parse(xhttp.responseText);          
    }

    getProviderServices(){
        const method = "GET";    
        let xhttp = new XMLHttpRequest();    
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id + "/services";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return JSON.parse(xhttp.responseText);        
    }

    getProviderInfo(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/providers/" + this.state.id;
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return JSON.parse(xhttp.responseText);         
    }

    retrieveComments(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/providers/' + this.state.id +'/comments';
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        } 

        return JSON.parse(xhttp.responseText);
    }

    getProviderContent(){
        const info = this.getProviderInfo()[0];
        const services = this.getProviderServices();
        const portfolios = this.getProviderPortfolios();

        this.setState({
            info: info,
            services: services,
            portfolios: portfolios
        });
    }

    componentWillMount(){
        this.getProviderContent();
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

    renderSlides(){
        return this.state.portfolios.map((portfolio) => (
            <IonSlide>
                <IonImg src={this.getImage()} />         
            </IonSlide>
        ));
    }

    renderServices(){
        return this.state.services.map((service) =>(
            <IonItem>
                <IonLabel>{service.title} | {service.price} €</IonLabel>
            </IonItem>
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
                calendarType={store.getState().userAccount.role === 'client' ? "clientSearchResult": null}
            />);
    }

    renderOveriew(){
        return(<IonText>{this.state.info.overview}</IonText>);
    }

    renderComments(){
        const comments = this.retrieveComments();
        return comments.map((comment)=>(
            <IonCard key={comment.ID} id={comment.ID}>
                <IonText>{comment.grade} / 5</IonText>
                <IonCardContent>
                    <IonText>{(comment.comment.trim() !== '' ? comment.comment : "No content")}</IonText>
                </IonCardContent>
            </IonCard>
        ));
    }

    renderAvatar(){
        
        return(
            <IonAvatar>
                <IonImg src={this.getImage()} />
            </IonAvatar>
        );
        
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
            <BeautyHeader/>
                <IonContent>                    
                    <IonItem>
                        {this.renderAvatar()}
                        <IonLabel>{this.state.info.name}</IonLabel>
                        <IonLabel>{this.state.info.address}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonSlides options={this.state.slideoptions}>
                            {this.renderSlides()}
                        </IonSlides>
                    </IonItem>
                <IonItem>  
                    <IonTitle>Overview</IonTitle>
                    {this.renderOveriew()}
                </IonItem> 
                <IonItem>  
                    <IonList>
                        <IonTitle>Services</IonTitle>
                        {this.renderServices()}
                    </IonList>
                </IonItem>   
                <IonContent>  
                    {this.renderScheduler()}
                </IonContent>  
                <IonItem>  
                    <IonList>
                    <IonTitle>Comments</IonTitle>
                        {this.renderComments()}
                    </IonList>
                </IonItem>  

                </IonContent>

                <IonToast color="danger"
                isOpen={this.state.showToastError}
                onDidDismiss={() => this.setState({ showToastError : false })}
                message= {this.state.toastErrorMessage}
                duration={1000}
                />
            </IonPage>
        )
    }
}

export default Provider;
