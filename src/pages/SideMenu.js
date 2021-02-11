import React from 'react';
import { 
    IonMenu, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonList, 
    IonMenuToggle, 
    IonLabel, 
    IonItem 
} from "@ionic/react";
import { withRouter } from 'react-router';

import store from "../redux/store";
import { connect } from 'react-redux';
import { log_out } from '../redux/actions';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        let currentState = store.getState().userAccount; 
                
        store.subscribe(this.handleChange);

        this.state = { 
            connected: currentState.id !== null,
            pages: [],
        	activePage: 'Home',
            history: props.history,
        	}
    }

    componentDidMount(){}

    handleChange(){
        let currentState = store.getState().userAccount; 
        this.setState({connected: currentState.id !== null}) ;  

        if( this.state.connected === true){
            this.navigateToPage(this.state.pages[0]);
        }
    }

    renderMenuItems(){  
        if(this.state.connected === false)
        {
            this.state.pages = [
                { icon: '', title: 'Home', path: '/' },
                { icon: '', title: 'Sign in', path: '/signIn' },
                { icon: '', title: 'Sign up', path: '/signUp' },
                { icon: '', title: 'About', path: '/about' },
                
            ];
        }
        else
        {
            this.state.pages = [
                { icon: '', title: 'Home', path: '/' },
                { icon: '', title: 'Profile', path: '/user' },
                { icon: '', title: 'About', path: '/about' }
                
            ];
        }
        
        return this.state.pages.map((page) => (
            <IonMenuToggle key={page.title} auto-hide="false">
                <IonItem button
                    color={page.title === this.state.activePage ? 'primary' : ''}
                    onClick={() => this.navigateToPage(page)}>
                    <IonLabel>
                        {page.title}
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        ));
    }

    navigateToPage(page){
    	let local_history = this.state.history;
    	
        local_history.push(page.path);
        this.setState({activePage: page.title});
    }

    render (){
    return (
        <IonMenu contentId="main" class="main-menu">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Menu
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {this.renderMenuItems()}
                    {(this.state.connected === true) && (
		     <IonMenuToggle key='Log out' auto-hide="false">
			<IonItem button
			    color='danger'
			    onClick={() => {
                    this.props.log_out();
                    this.navigateToPage(this.state.pages[0]);
                    }} >
			    <IonLabel>
				Log out
			    </IonLabel>
			</IonItem>
		     </IonMenuToggle>
		     )}
                </IonList>
            </IonContent>
        </IonMenu>
    );
    }
}

export default connect(
    null,
    { log_out }
)  (
    withRouter(SideMenu)
);





