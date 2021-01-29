import React from 'react';
import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from '@ionic/react';
import { connect } from 'react-redux';
import { search } from '../redux/actions';

class BeautySearch extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            searchByName: false

        };
    }

    handleSearch = (e) => {
       
        if (e.key === "Enter" && this.state.searchText.length > 2)
        {
            
            this.props.search( this.state );
        }
    }
   

    render (){
        return (
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton onClick={() => {this.setState({ searchByName: false })}  } >Par service</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton onClick={() => {this.setState({ searchByName: true })}  }  >Par nom</IonButton>
                    </IonCol>
                </IonRow>
    
                <IonRow>
                    <IonCol>
                        <IonSearchbar 
                        value={this.state.searchText} 
                        onIonChange={e => {this.setState({ searchText: e.detail.value})} }                        
                        onkeypress ={e => {this.handleSearch(e)}}
                        ></IonSearchbar>
                    </IonCol>
                </IonRow>
            </IonGrid>
        );
        
    }
    
}

export default connect(
    null,
    { search }
) (BeautySearch);