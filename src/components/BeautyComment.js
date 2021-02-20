import React from 'react';

import { 
    IonButton, 
    IonContent,
    IonFooter,
    IonLabel,
    IonTextarea,
    IonToolbar
} from '@ionic/react';

import store from "../redux/store";

class BeautyComment extends React.Component{
    constructor(props){
        super(props);

        this.state = {
        }

        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }

    sendComment(method)
    {
        const comment = (document.getElementById("commentTextArea")).value;
        const token = store.getState().userAccount.token;

        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/clients/' + this.state.identifier +'/comments';
        xhttp.open(method, url, false);

        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }

        try{
            xhttp.send(JSON.stringify({comment: comment})); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        } 
    }

    handleSaveComment(){
        this.sendComment("POST");
    }

    handleEditComment(){
        this.sendComment("PUT");
    }

    render(){
        return(
            <IonContent>
                <IonLabel>Comment</IonLabel>
                <IonTextarea
                    id="commentTextArea"
                    autocapitalize 
                    inputmode='text' 
                    maxlength='250'
                    value={this.props.comment.comment}
                    autoGrow={true}
                    autofocus={true}
                    rows={2}
                />
                    {
                        (this.props.isUpdate === true) &&(
                            <IonButton onClick={this.handleEditComment}>Update</IonButton>
                        )
                    }
                    {
                        (this.props.isUpdate === false) &&(
                            <IonButton onClick={this.handleSaveComment}>Save</IonButton>
                        )
                    }
            </IonContent>
        )
    }
}

export default BeautyComment;