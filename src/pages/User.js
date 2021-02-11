import React from 'react';

import {
    IonPage,
    IonContent,
    IonGrid, 
    IonCol,
    IonButton,
    IonRow,
    IonModal
} from '@ionic/react';

import store from "../redux/store";

import BeautyHeader from '../components/BeautyHeader';

class User extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            showModalAccount: false,
            showModalComments: false,
            showModalSchedule: false,
            showModalPortfolio: false,
            showModalServices: false,
            showModalAdminComments: false,
            showModalAdminClientsAccount: false,
            showModalAdminProvidersAccount: false,
            role : store.getState().userAccount.role,
            userId : store.getState().userAccount.id
        };
    }

    render (){
        return (
           <IonPage>
           <BeautyHeader />
               <IonContent>
                   <IonGrid>
                   { (this.state.role === 'admin') && (
                       <div>
                       <IonRow>
                           <IonCol>
                                <div>
                                   <IonModal isOpen={ this.state.showModalAdminComments }>
                                       <p>Manage clients comments</p>
                                       <IonButton onClick={ () => {this.setState({ showModalAdminComments : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalAdminComments: true})}}>Manage clients comments</IonButton>
                               </div>
                           </IonCol>
                           <IonCol>
                                <div>
                                   <IonModal isOpen={ this.state.showModalAdminClientsAccount }>
                                       <p>Manage clients accounts</p>
                                       <IonButton onClick={ () => {this.setState({ showModalAdminClientsAccount : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalAdminClientsAccount: true})}}>Manage clients accounts</IonButton>
                               </div>
                           </IonCol>
                       </IonRow>
                        <IonRow>
                           <IonCol>
                                <div>                               
                                    <IonModal isOpen={ this.state.showModalAdminProvidersAccount }>
                                        <p>Manage providers accounts</p>
                                        <IonButton onClick={ () => {this.setState({ showModalAdminProvidersAccount : false })} }>Close Modal</IonButton>
                                    </IonModal>
                                    <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalAdminProvidersAccount: true})}}>Manage providers accounts</IonButton>
                                </div>
                           </IonCol>
                           <IonCol>
                           </IonCol>
                       </IonRow>
                       </div>
                   )}
                   { (this.state.role !== 'admin') && (
                       <div>
                       <IonRow>
                           <IonCol>
                                <div>
                                   <IonModal isOpen={ this.state.showModalComments }>
                                       <p>Comments</p>
                                       <IonButton onClick={ () => {this.setState({ showModalComments : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalComments: true})}}>Comments</IonButton>
                               </div>
                           </IonCol>
                           <IonCol>
                                <div>
                                   <IonModal isOpen={ this.state.showModalSchedule }>
                                       <p>Schedule</p>
                                       <IonButton onClick={ () => {this.setState({ showModalSchedule : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalSchedule: true})}}>Schedule</IonButton>
                               </div>
                           </IonCol>
                       </IonRow>
                       { (this.state.role === 'provider') && (
                       <IonRow>
                            <IonCol>
                               <div>
                                   <IonModal isOpen={ this.state.showModalPortfolio }>
                                       <p>Portfolio</p>
                                       <IonButton onClick={ () => {this.setState({ showModalPortfolio : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalPortfolio: true})}}>Portfolio</IonButton>
                               </div>
                           </IonCol>
                           <IonCol>
                               <div>
                                   <IonModal isOpen={ this.state.showModalServices }>
                                       <p>Services</p>
                                       <IonButton onClick={ () => {this.setState({ showModalServices : false })} }>Close Modal</IonButton>
                                   </IonModal>
                                   <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalServices: true})}}>Services</IonButton>
                               </div>
                           </IonCol>
                       </IonRow>
                       )}
                        <IonRow>
                           <IonCol>
                                <div>                               
                                    <IonModal isOpen={ this.state.showModalAccount }>
                                        <p>Account</p>
                                        <IonButton onClick={ () => {this.setState({ showModalAccount : false })} }>Close Modal</IonButton>
                                    </IonModal>
                                    <IonButton size="large"  expand="block" onClick={() => {this.setState({showModalAccount: true})}}>Account</IonButton>
                                </div>
                           </IonCol>
                           <IonCol>
                           </IonCol>
                       </IonRow>    
                       </div>                   
                   )}
                   </IonGrid>

               </IonContent>

           </IonPage>
        )

    }
    
}

export default User;