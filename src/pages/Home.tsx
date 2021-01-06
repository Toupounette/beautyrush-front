import { IonPage } from '@ionic/react';
import React from 'react';
import './Home.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BeautySearch from '../components/BeautySearch'

const Home = () => {
  return (
    <IonPage>
      <Header />
      <BeautySearch />
      <Footer />
    </IonPage>
  );
};

export default Home;