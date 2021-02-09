import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IonApp, IonPage, IonSplitPane, } from '@ionic/react';

import SideMenu from './pages/SideMenu'

import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import User from './pages/User';
import Schedule from './pages/Schedule';
import Provider from './pages/Provider';

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
import { Redirect } from 'react-router';

class App extends React.Component{
  constructor(props:any){
    super(props);
    this.state = { };
  }

render (){
return (
  <>
  <Router>
    <div id="app">
      <IonApp>
        <IonSplitPane contentId="main">
          <SideMenu />
          <IonPage id="main">
            <Switch>
              <Route path="/admin" component={Admin} exact={true} />
              <Route path="/about" component={About} exact={true} />
              <Route path="/signin" component={SignIn} exact={true} />
              <Route path="/signup" component={SignUp} exact={true} />
              <Route path="/user" component={User} exact={true} />
              <Route path="/schedule" component={Schedule} exact={true} />
              <Route path="/provider/:id" component={Provider} exact={true} />
              <Route path="/home" component={Home} exact={true} />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
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







