import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonPage, IonSplitPane, } from '@ionic/react';

import SideMenu from './pages/SideMenu'

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Provider from './pages/Provider';
import Scheduler from './pages/Scheduler';
import Comments from './pages/Comments';
import Account from './pages/Account';
import Services from './pages/Services';
import ForgottenPassword from './pages/ForgottenPassword';
import UpdatePassword from './pages/UpdatePassword';
import GeneralTerms from './pages/GeneralTerms';
import LegalMentions from './pages/LegalMentions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Redirect } from 'react-router-dom';

import store from "./redux/store";

type AppProps = {};
type AppState = {connected: boolean, role: string};

class App extends React.Component<AppProps, AppState>{
  constructor(props: AppProps){
    super(props);

    const currentState = store.getState().userAccount;

    this.state = {
      connected: currentState.id !== null,
      role: (currentState.role !== null ? currentState.role : '')
     };
     
     this.handleChange = this.handleChange.bind(this);
     store.subscribe(this.handleChange);
  }

  handleChange(){
      const currentState = store.getState().userAccount; 
      this.setState({connected: currentState.id !== null}) ;  
  }

render (){
return (
  <>
  <Router>
    <div id="app">
      <IonApp class='beautyrushapp'>
        <IonSplitPane contentId="main">
          <SideMenu />
          <IonPage id="main">
            <Switch>
              <Route path="/about" component={About} exact={true} />
              <Route path="/generalterms" component={GeneralTerms} exact={true}/>
              <Route path="/legalmentions" component={LegalMentions} exact={true}/>
              <Route path="/privacypolicy" component={PrivacyPolicy} exact={true}/>
              <Route path="/contact" component={Contact} exact={true}/>


              <Route path="/provider/:id" component={Provider} exact={true} />
              <Route path="/home" component={Home} exact={true} />

              <Route exact path="/" render={() => <Redirect to="/home" />} />

              {
                (this.state.connected === false ) && (
                  <>                  
                    <Route path="/signin" component={SignIn} exact={true} />
                    <Route path="/signup" component={SignUp} exact={true} />
                    <Route path="/forgottenpassword" component={ForgottenPassword} exact={true} />
                  </>
                )
              }

              {
                (this.state.connected === true && this.state.role !== 'admin') && (
                  <>
                    <Route path="/account" component={Account} exact={true} />
                    <Route path="/updatepassword" component={UpdatePassword} exact={true} />
                    <Route path="/comments" component={Comments} exact={true} />
                    <Route path="/schedule" component={Scheduler} exact={true} />
                    {
                      (this.state.role === 'provider') && (
                        <>                        
                          <Route path="/portfolio" component={User} exact={true} />
                          <Route path="/services" component={Services} exact={true} />
                        </>
                      )
                    }
                  </>
                )
              }
              
              {
                (this.state.connected === true && this.state.role === 'admin') && (
                  <>
                    <Route path="/admin" component={Admin} exact={true} />
                  </>
                )
              }
              
              <Route path="*" component={Home} />
            </Switch>
          </IonPage>
        </IonSplitPane>
      </IonApp>
    </div>
  </Router>
  </>
);
}
}

export default App;







