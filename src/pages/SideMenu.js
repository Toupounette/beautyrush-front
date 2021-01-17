import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonMenuToggle, IonIcon, IonLabel, IonItem } from "@ionic/react";
import { withRouter } from 'react-router';

import store from "../redux/store";

class SideMenu extends React.Component {
    constructor(props) {
        super(props);
                
        const unsubscribe = store.subscribe(this.handleChange);
        // unsubscribe();

        this.state = { 
            connected:false,
            pages: [],
        	activePage: 'Home',
            history: props.history,
        	}
    }

    componentDidMount(){}

    handleChange = () => {
        let currentState = store.getState().connectAccount; 
        this.state.connected = currentState.id !== 0 ;  
      }

    renderMenuItems = () => {  
        console.log("this.state.connected: ", this.state.connected);
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
                { icon: '', title: 'About', path: '/about' },
            ];
        }
        
        return this.state.pages.map((page) => (
            <IonMenuToggle key={page.title} auto-hide="false">
                <IonItem button
                    color={page.title === this.state.activePage ? 'primary' : ''}
                    onClick={() => this.navigateToPage(page)}>
                    <IonIcon slot="start" name={page.icon}></IonIcon>
                    <IonLabel>
                        {page.title}
                    </IonLabel>
                </IonItem>
            </IonMenuToggle>
        ));
    }

    navigateToPage = (page) => {
    	let local_history = this.state.history;
    	
        local_history.push(page.path);
        this.setState({activePage: page.title});
    }

    render (){
    return (
        <IonMenu contentId="main">
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
                </IonList>
            </IonContent>
        </IonMenu>
    );
    }
}

export default withRouter(
    SideMenu
);





















