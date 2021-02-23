import { 
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonToast
 } from '@ionic/react';
import React from 'react';

import BeautyHeader from '../components/BeautyHeader';
import BeautyHome from '../components/BeautyHome';
import BeautySearhcresult from '../components/BeautySearchResult';


class Home extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        searchText: '',
        searchType: 'byservice',
        searchResult: [],
        showToastWarning: false,
        showToastError: false,
        toastErrorMessage: ''
      };
  }

  search(){
      // Methode d'envoie de la requete : GET | POST | PUT | PATCH | DELETE
      const method = "GET";
  
      // XMLHttpRequest = classe js qui permet de creer des requetes http
      // new = permet de creer un objet de la classe
      let xhttp = new XMLHttpRequest();
  
      // Le chemin (path) est defini en fonction du type de recherche
      let path ="";
      if(this.state.searchType === 'byname')
      {
          path = '/search?type=byname&value=' + this.state.searchText;
      }
      else
      {
          path = '/search?type=byservice&value='  + this.state.searchText;
      }
  
      // URL de la requete contruite avec les donnees du fichier .env
      const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + path;
      
      // false en à la fin pour rendre cette methode générale asynchrone synchrone
      xhttp.open(method, url, false);
      
      // Envoi de la requete de création de compte au serveur back
      try{
        xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }

      // reponse de serveur vers le front en dessous, et requete du front vers le serveur au dessus
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
    return (
    <IonPage>
    <BeautyHeader />
      <IonContent>
      <IonGrid>
            <IonRow>
                <IonCol>
                    <IonSelect sizeXs  value={ this.state.searchType } aria-required onIonChange={e => this.setState({ searchType: e.detail.value, searchResult:[] })}>
                        <IonSelectOption value='byservice'>Search by service</IonSelectOption>
                        <IonSelectOption value='byname'>Search by name</IonSelectOption>
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
            (this.state.searchResult.length === 0 ) && (
                <BeautyHome/>
            )
        }
        {
            (this.state.searchResult.length > 0 ) && (
                <BeautySearhcresult searchResult={this.state.searchResult} />
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
    </IonPage>
    );
  }
};

export default Home;