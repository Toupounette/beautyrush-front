import React from 'react';

import { 
    IonContent, 
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonToast
} from '@ionic/react';

import store from '../redux/store';

import BeautyHeader from '../components/BeautyHeader';
import BeautyAccountsResult from '../components/BeautyAccountsResult';
import BeautyCommentsResult from '../components/BeautyCommentsResult';

class Admin extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            searchText: '',
            searchType: 'useraccount',
            accountType: 'clients',
            searchResult: [],
            showToastWarning: false,
            showToastError: false,
            showToastSuccess: false,
            toastErrorMessage: '',
            toastSuccessMessage: ''
        };

        this.deleteComment = this.deleteComment.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
    }

    deleteAccount(accountID, accountType){
        const method = "DELETE";
        const token = store.getState().userAccount.token;
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/'+accountType+'/' + accountID ;
        xhttp.open(method, url, false);
        
        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }

        try{
            xhttp.send(); 
            this.setState({ showToastSuccess: true });
        }
        catch(err) {
            this.setState({ showToastError: true });
        }

        this.forceUpdate();
    }

    deleteComment(clientId, commentId){
        const method = "DELETE";
        const token = store.getState().userAccount.token;
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/clients/' + clientId +'/comments/' + commentId;
        xhttp.open(method, url, false);
        
        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }

        try{
            xhttp.send(); 
            this.setState({ showToastSuccess: true });
        }
        catch(err) {
            this.setState({ showToastError: true });
        }

        this.forceUpdate();
    }

    search(){
        const method = "GET";

        let xhttp = new XMLHttpRequest();
        let path ="";

        if(this.state.searchType === 'useraccount'){
            path = '/administrators/search/user?type='+ this.state.accountType +'&value=' + this.state.searchText;
        }
        else{            
            path = '/administrators/search/comment?type='+ this.state.accountType +'&value=' + this.state.searchText;
        }

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
      
        xhttp.open(method, url, false);

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

        return JSON.parse(xhttp.responseText);
    }

    handleSearch(e){ 
        if (e.key === "Enter" && this.state.searchText.length > 2)
        {   
            const results = this.search( );
            this.setState({ searchResult: results});
            this.forceUpdate();
        }
        else if (e.key === "Enter" && this.state.searchText.length <= 2)
        {   
            this.setState({ showToastWarning: true })
        }
    }

    render(){
        // protection de la page d'administration
        // seul un admin peut
        if(store.getState().userAccount.role !== 'admin' || 
            store.getState().userAccount.token.trim() === '' ||
            store.getState().userAccount.id === null){
            window.location.replace('/home');
        }

        return(
            <IonPage>
            <BeautyHeader />
              <IonContent>
              <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonSelect sizeXs  value={ this.state.searchType } aria-required onIonChange={e => this.setState({ searchType: e.detail.value, searchResult:[] })}>
                                <IonSelectOption value='useraccount'>Search user account</IonSelectOption>
                                <IonSelectOption value='usercomment'>Search user comment</IonSelectOption>
                            </IonSelect>
                            <IonSelect sizeXs  value={ this.state.accountType } aria-required onIonChange={e => this.setState({ accountType: e.detail.value, searchResult:[] })}>
                                <IonSelectOption value='clients'>Client</IonSelectOption>
                                <IonSelectOption value='providers'>Provider</IonSelectOption>
                            </IonSelect>
                            <IonSearchbar 
                            value={this.state.searchText} 
                            onIonChange={e => {this.setState({ searchText: e.detail.value})} }                        
                            onkeypress ={e => {this.handleSearch(e)}}
                            ></IonSearchbar>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                {
                    (this.state.searchResult.length > 0 && this.state.searchType === 'useraccount' ) && (
                       <BeautyAccountsResult searchResult={this.state.searchResult} deleteAccount={this.deleteAccount} /> 
                    )
                }
                {
                    (this.state.searchResult.length > 0 && this.state.searchType !== 'useraccount' ) && (
                        <BeautyCommentsResult searchResult={this.state.searchResult} deleteComment={this.deleteComment} />
                    )
                }
                </IonContent>
        
                <IonToast color="danger"
                isOpen={this.state.showToastError}
                onDidDismiss={() => this.setState({ showToastError : false })}
                message= {this.state.toastErrorMessage}
                duration={1000}
                />
                <IonToast color="warning"
                isOpen={this.state.showToastWarning}
                onDidDismiss={() => this.setState({ showToastWarning : false })}
                message= "Type at lease 3 characters"
                duration={1000}
                />
                <IonToast color="success"
                isOpen={this.state.showToastSuccess}
                onDidDismiss={() => this.setState({ showToastSuccess : false })}
                message= {this.state.toastSuccessMessage}
                duration={1000}
                />
            </IonPage>
        );
    }
}

export default Admin;