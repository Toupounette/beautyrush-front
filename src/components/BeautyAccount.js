import { 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonButton,
    IonToast,
    IonContent,
    IonRouterLink,
    IonRow,
    IonCol
} from '@ionic/react';

import React from 'react';

import store from '../redux/store';

class BeautyAccount extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: props.role,
            identifier: props.identifier,
            token : store.getState().userAccount.token,
            accountData : null,
            showToastSucces : false,
            showToastError : false,
            toastErrorMessage: ''
        };
    }

    retrieveAcountData(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier ;
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

        this.state.accountData = JSON.parse(xhttp.responseText)[0];
    }

    saveData(data){
        const method = "PUT";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier ;
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        xhttp.setRequestHeader("Content-Type", "application/json");

        try{
            xhttp.send(JSON.stringify(data)); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }
        
        return xhttp;
    }

    handleUpdate(){
        var elements = document.getElementsByTagName('ion-input');

        let reconstructedData = {}
        for(var i = 0; i < elements.length; i++){
            var element = elements[i];

            var elementName = element.getAttribute("id").replace('account_', '');
            var elementValue = element.value;

            reconstructedData[elementName] = elementValue;
        }

        const saveDataResponse = this.saveData(reconstructedData);

        if(saveDataResponse.status === 200){
            this.setState({ showToastSuccess : true });
            this.forceUpdate();
        }
        else{
            this.setState({  showToastError : true, toastErrorMessage: "An erro ccured. Try later" });           
        }
    }

    renderAcountData(){
        this.retrieveAcountData();

        let accountDataList = [];

        for(const key in this.state.accountData){
            let value = this.state.accountData[key];
            if( key === 'ID'){
                // On esquive l'affichage de l'ID
                continue;
            }
            accountDataList.push(
                <IonItem>
                    <IonLabel position="stacked">{key} : </IonLabel>
                    <IonInput  id={'account_'+key} type='text' value={value} />
                </IonItem>
            );
        }
        return  accountDataList;
    }

    render(){
        return(
            <>
            <IonContent>
                 {this.renderAcountData()}
                 <IonButton onClick={()=>{this.handleUpdate()}} color='warning'>Update</IonButton>
                    
                 <IonToast color="success"
                    isOpen={this.state.showToastSuccess}
                    onDidDismiss={() => this.setState({ showToastSuccess : false })}
                    message="Your account has been successfully updated"
                    duration={1000}
                    />
                    <IonToast color="danger"
                    isOpen={this.state.showToastError}
                    onDidDismiss={() => this.setState({ showToastError : false })}
                    message= {this.state.toastErrorMessage}
                    duration={1000}
                    />
                    <IonRow>
                        <IonCol>
                            <IonRouterLink href="/updatepassword">                            
                            Update your password
                            </IonRouterLink>
                        </IonCol>
                    </IonRow>
            </IonContent>
            </>

            
        );

      
    }
}

export default BeautyAccount;