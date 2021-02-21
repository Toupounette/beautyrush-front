import { 
    IonButton,
    IonCard,
    IonTextarea,
    IonCardHeader,
    IonLabel,
    IonList,
    IonItem,
    IonToast,
    IonModal
 } from '@ionic/react';
import React from 'react';

import store from "../redux/store";

import BeautyComment from './BeautyComment'

class BeautyComments extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: props.role,
            identifier: props.identifier,
            token : store.getState().userAccount.token,
            comments : [],
            showToastError: false,
            toastErrorMessage: '',
            showEditModal: false,
            commentToUpdate: null
        }

        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleDeleteComment(commentId){        
        const method = "DELETE";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier +'/comments/' + commentId;
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

        this.retrieveComments();
        this.forceUpdate();
    }

    retrieveComments(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier +'/comments';
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

        this.state.comments = JSON.parse(xhttp.responseText);
    }

    renderComments(){
        this.retrieveComments();

        return this.state.comments.map((comment)=>(
            <IonItem key={comment.ID} id={comment.ID}>
                <IonCard >
                    <IonCardHeader>
                        <IonLabel><strong>{comment.title} with {comment.name} on {comment.moment}</strong></IonLabel>
                    </IonCardHeader>
                    <IonTextarea value={comment.comment} autocapitalize readonly='true' />
                    {
                        (this.state.role !== 'provider') && (
                            <>
                                <IonButton color="warning" onClick={()=>{
                                    this.setState({
                                        commentToUpdate: comment.appID,
                                        showEditModal: true
                                    });
                                }} >Edit</IonButton>
                                <IonButton color="danger" onClick={()=>{this.handleDeleteComment(comment.ID)}} size={1} >Delete</IonButton>
                            </>
                        )
                    }
                </IonCard>
            </IonItem>
        ));
    }

    render(){
        return(
            <>
                <IonList>
                    {this.renderComments()}
                </IonList>                
                
                <IonModal
                    isOpen={this.state.showEditModal}                        
                    onDidDismiss={()=>{ this.setState({showEditModal: false}) }}   
                >
                    <BeautyComment appointmentID={this.state.commentToUpdate} closeModal={() =>{this.setState({ showEditModal : false })}} />
                </IonModal>

                <IonToast color="danger"
                isOpen={this.state.showToastError}
                onDidDismiss={() => this.setState({ showToastError : false })}
                message= {this.state.toastErrorMessage}
                duration={1000}
                />
            </>
        );
    }
}

export default BeautyComments;