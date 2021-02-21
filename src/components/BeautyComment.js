import React from 'react';

import { 
    IonButton, 
    IonContent,
    IonInput,
    IonLabel,
    IonTextarea,
    IonToast
} from '@ionic/react';

import store from "../redux/store";

class BeautyComment extends React.Component{
    constructor(props){
        super(props);
        
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.handleGradeEdite = this.handleGradeEdite.bind(this);

        const  token = store.getState().userAccount.token;
        
        const method = "GET";

        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/appointments/' + props.appointmentID +'/comment';
        xhttp.open(method, url, false);

        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }

        try{
            xhttp.send(); 

            const response = JSON.parse(xhttp.responseText);
            console.log("response = ", response);

            this.state = {
                token: token,
                userID: store.getState().userAccount.id,
                comment:  response.comment.replaceAll("\"", "").replaceAll("\\", ""),
                grade:   response.grade,
                appointmentID: props.appointmentID,
                isUpdate: (response.comment.trim() !== ''),
                showToastWarning: false,
                showToastError: false,
                showToastSuccess: false,
                warningToastMessage: ''
            }
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        } 
    }

    sendComment(method)
    {     
        const comment = (document.getElementById("commentTextArea")).value;
        const grade = (document.getElementById("grade")).value;
        const appointment_id = this.state.appointmentID;

        const commentData = {
            comment: comment,
            grade: grade,
            appointment_id: appointment_id
        }

        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/clients/' + this.state.userID +'/comments';
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        try{
            xhttp.send(JSON.stringify(commentData)); 

            if(xhttp.status === 200){
                this.setState({showToastSuccess: true});
            }
            else{
                this.setState({showToastError: true});
            }
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

    handleGradeEdite(event){
        const eventValue = event.detail.value;
        if(eventValue > 5){
            (document.getElementById('grade')).value = 5;
            this.setState({warningToastMessage: 'Cannot grade more than 5', showToastWarning: true});
        }
        else if(eventValue < 0){
            (document.getElementById('grade')).value = 0;
            this.setState({warningToastMessage: 'Cannot grade less than 0', showToastWarning: true});
        }
    }

    render(){
        return(
            <IonContent>
                <IonLabel position='stacked'>Grade</IonLabel>
                <IonInput 
                    id='grade' 
                    required={true} 
                    min='0' 
                    max='5' 
                    inputmode="numeric" 
                    type='number'
                    value={this.state.isUpdate ? this.state.grade: 3}
                    onIonChange={this.handleGradeEdite}
                />
                <IonLabel position='stacked'>Comment</IonLabel>
                <IonTextarea
                    id="commentTextArea"
                    autocapitalize 
                    inputmode='text' 
                    maxlength='250'
                    value={this.state.isUpdate ? this.state.comment: ''}
                    autoGrow={true}
                    autofocus={true}
                    rows={2}
                />
                    {
                        (this.state.isUpdate === true) &&(
                            <IonButton onClick={this.handleEditComment}>Update</IonButton>
                        )
                    }
                    {
                        (this.state.isUpdate === false) &&(
                            <IonButton onClick={this.handleSaveComment}>Save</IonButton>
                        )
                    }
                <IonButton onClick={this.props.closeModal}>Close</IonButton>
                
                <IonToast color="success"
                isOpen={this.state.showToastSuccess}
                message="Comment saved"
                duration={1000}
                onDidDismiss={() =>{
                    this.setState({showToastSuccess: false});
                    this.props.closeModal();
                }}
                />

                <IonToast color="warning"
                isOpen={this.state.showToastWarning}
                message={this.state.warningToastMessage}
                duration={1000}
                onDidDismiss={() =>{
                    this.setState({showToastWarning: false});
                }}
                />
                
                <IonToast color="danger"
                isOpen={this.state.showToastError}
                message="Cannot save comment. Please try later"
                duration={1000}
                onDidDismiss={() =>{
                    this.setState({showToastError: false});
                }}
                />
            </IonContent>
        )
    }
}

export default BeautyComment;