import React from 'react';

import {
    IonCard,
    IonItem,
    IonButton,
    IonCardContent,
    IonTitle,
    IonList,
    IonText
} from '@ionic/react'
import store from '../redux/store';

class BeautyCommentsResult extends React.Component{
    constructor(props){
        super(props);

        this.state = {            
            showToastError: false,
            showToastSuccess: false
        };
    }

    renderComments(){
        return this.props.searchResult.map((comment) =>(
            <IonCard>
                <IonItem>
                    <IonText>{comment.comment}</IonText>
                </IonItem>

                <IonCardContent>
                    <IonButton color="primary" fill="outline" slot="end" onClick={() => {this.props.deleteComment(comment.client_id, comment.ID)}}>Delete</IonButton>
              </IonCardContent>
            </IonCard>
        ));
    }

    render(){
        return(
            <>
                <IonTitle>Search comment result</IonTitle>
                <IonList>
                    {this.renderComments()}
                </IonList>
            </>
        );
    }
}

export default BeautyCommentsResult;