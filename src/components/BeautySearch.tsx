import React, { useState } from 'react';
import { IonButton, IonCol, IonGrid, IonRow, IonSearchbar } from '@ionic/react';

const BeautySearch = () => {
    const [searchText, setSearchText] = useState('');
    const [searchByName, setSearchByName] = useState(false);
    return (
        <IonGrid>
            <IonRow>
                <IonCol size-xs>
                    <IonButton onClick={() => setSearchByName(false)} >Par service</IonButton>
                </IonCol>
                <IonCol size-sm>
                    <IonButton onClick={() => setSearchByName(true)}  >Par nom</IonButton>
                </IonCol>
            </IonRow>

            <IonRow>
                <IonCol size-xl>
                    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
}

export default BeautySearch;