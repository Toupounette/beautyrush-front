import { 
    IonButton, 
    IonCard, 
    IonTextarea, 
    IonCardHeader, 
    IonFooter, 
    IonLabel, 
    IonList, 
    IonToolbar,
    IonItem
 } from '@ionic/react';
import React from 'react';

import store from "../redux/store";

class BeautyComments extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            type: props.type,
            identifier: props.identifier,
            token : store.getState().userAccount.token,
            comments : []
        }

        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleDeleteComment(commentId){        
        const method = "DELETE";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.type + 's/' + this.state.identifier +'/comments/' + commentId;
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        xhttp.send(); 

        this.retrieveComments();
        this.forceUpdate();
    }

    handleSaveComment(commentId){
        console.log("save");

        let editButton = document.getElementById('edit_' + commentId);
        editButton.style.display = 'block';

        let saveButton = document.getElementById('save_' + commentId);
        saveButton.style.display = 'none';
    }

    handleEditComment(commentId){
        console.log("edit");

        let commentToEdit = document.getElementById(commentId);
        commentToEdit.readonly= 'true';
        commentToEdit.disabled = 'false';

        let editButton = document.getElementById('edit_' + commentId);
        editButton.style.display = 'none';

        let saveButton = document.getElementById('save_' + commentId);
        saveButton.style.display = 'block';
    }

    retrieveComments(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.type + 's/' + this.state.identifier +'/comments';
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        xhttp.send(); 

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
                    <IonTextarea value={comment.comment} autocapitalize readonly='true' disabled='false' inputmode='text' maxlength='250' />
                    {
                        (this.state.type !== 'provider') && (
                            <IonFooter>
                                <IonToolbar>
                                    <IonButton id={'save_' + comment.ID} color="warning" onClick={()=>{this.handleSaveComment(comment.ID)}} size={1} style={{display:'none'}} >Save</IonButton>
                                    <IonButton id={'edit_' + comment.ID} color="warning" onClick={()=>{this.handleEditComment(comment.ID)}} size={1} style={{display:'block'}} >Edit</IonButton>
                                    <IonButton color="danger" onClick={()=>{this.handleDeleteComment(comment.ID)}} size={1} >Delete</IonButton>
                                </IonToolbar>
                            </IonFooter>
                        )
                    }
                </IonCard>
            </IonItem>
        ));
    }

    render(){
        return(
            <IonList>
                {this.renderComments()}
            </IonList>
        );
    }
}

export default BeautyComments;