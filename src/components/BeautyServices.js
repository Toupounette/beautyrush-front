import { 
    IonButton, 
    IonContent, 
    IonFooter, 
    IonIcon, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonModal, 
    IonSelect,
    IonToolbar,
    IonToast
} from '@ionic/react';
import React from 'react';

import store from '../redux/store';

import {
    addCircle,
    trash,
    sync
} from 'ionicons/icons';

class BeautyServices extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            showServicesModal: false,
            identifier: props.identifier,
            token : store.getState().userAccount.token,
            services : [],
            showToastError: false,
            toastErrorMessage: 'An error occured. Please try later'          
        }
    }

    handleSaveServices(){

    }

    getAllServices(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/services';
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

    retrieveProviderServices(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/providers/' + this.state.identifier + '/services';
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

        this.state.services = JSON.parse(xhttp.responseText);
    }

    renderServices(){
        this.retrieveProviderServices();

        return this.state.services.map((service) =>(
            <IonItem>
                <IonLabel position="stacked">{service.title} (€)</IonLabel>
                <IonInput size='3' id={'service_' + service.ID} type="number" value={service.price} ></IonInput>

                <IonButton size='small' color="warning">
                    <IonIcon size='small' icon={sync} />
                </IonButton>
                    
                <IonButton size='small' color="danger">
                    <IonIcon size='small' icon={trash} />
                </IonButton>
            </IonItem>
        ));
    }

    getNewServicesList(){
        const existingServices = this.state.services.map((service)=>(service.title));
        const availableServices = this.getAllServices();

        return availableServices.filter( (service)=>{ return existingServices.includes(service) } );
    }

    render(){
        return (
            <IonContent>
                <IonList>
                    {this.renderServices()}
                </IonList>
                <IonFooter>
                    <IonToolbar>
                        <IonModal isOpen={this.state.showServicesModal}>

                        </IonModal>
                        <IonButton   onClick={() => {this.setState({showServicesModal: true})}} fill="clear" >
                            <IonIcon  color="secondary" size="large"  icon={addCircle} />
                        </IonButton>
                    </IonToolbar>
                </IonFooter>
                
                <IonToast color="danger"
                isOpen={this.state.showToastError}
                onDidDismiss={() => this.setState({ showToastError : false })}
                message= {this.state.toastErrorMessage}
                duration={1000}
                />
            </IonContent>
        );
    }
}

export default BeautyServices;