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
    IonItem,
    IonItemGroup,
    IonItemDivider
} from "@ionic/react";

import { withRouter } from 'react-router';

import store from "../redux/store";
import { connect } from 'react-redux';
import { log_out } from '../redux/actions';

class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        const currentState = store.getState().userAccount;

        this.state = { 
            connected: currentState.id !== null,
            role: (currentState.role !== null ? currentState.role : ''),
            pages: [],
        	activePage: 'Home',
            history: props.history,
        	} 
                
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }

    handleChange(){
        const currentState = store.getState().userAccount; 
        this.setState({connected: currentState.id !== null}) ;  

        if( this.state.connected === true){
            this.navigateToPage(this.state.pages[0]);
        }
    }

    manageBtnColor(){
        switch( this.state.activePage){
            case 'Comment':
            case 'Schedule':
            case 'Account':
            case 'Portfolio':
            case 'Services':
            case 'User accounts':
            case 'User comments':
                {
                    return 'primary';
                }
            default:
                {
                    return '';
                }
        }
    }

    renderMenuItems(){  
        if(this.state.connected === false)
        {
            this.state.pages = [
                { icon: '', title: 'Home', path: '/', submenu: [] },
                { icon: '', title: 'Sign in', path: '/signIn', submenu: [] },
                { icon: '', title: 'Sign up', path: '/signUp', submenu: [] },
                { icon: '', title: 'About', path: '/about', submenu: [] },
                
            ];
        }
        else
        {
            let userSubmenu = [];

            switch(this.state.role){
                case 'admin':
                    {
                        userSubmenu = [
                            { icon: '', title: 'User comments', path: '/admincomments', submenu: [] },
                            { icon: '', title: 'User accounts', path: '/adminaccounts', submenu: [] },
                        ] ;
                        break;
                    }
                case 'client':
                    {
                        userSubmenu = [
                            { icon: '', title: 'Comment', path: '/comments', submenu: [] },
                            { icon: '', title: 'Schedule', path: '/schedule', submenu: [] },
                            { icon: '', title: 'Account', path: '/account', submenu: [] },
                        ] ;
                        break;
                    }
                case 'provider':
                    {
                        userSubmenu = [
                            { icon: '', title: 'Comment', path: '/comments', submenu: [] },
                            { icon: '', title: 'Schedule', path: '/schedule', submenu: [] },
                            { icon: '', title: 'Portfolio', path: '/portfolio', submenu: [] },
                            { icon: '', title: 'Services', path: '/services', submenu: [] },
                            { icon: '', title: 'Account', path: '/account', submenu: [] },
                        ] ;
                        break;
                    }
                default:
                    {
                        console.warn("Invalid role : " + this.state.role);
                    }
            }

            this.state.pages = [
                { icon: '', title: 'Home', path: '/', submenu: [] },
                { icon: '', title: 'Manage', path: null, submenu: userSubmenu },
                { icon: '', title: 'About', path: '/about', submenu: [] }
                
            ];
        }
        
        return this.state.pages.map((page) => (
            <>
                {
                    (page.path !== null) && (                        
                        <IonItem button
                        color={this.state.activePage === page.title  ? 'primary' : ''}
                            onClick={() => this.navigateToPage(page)}>
                            <IonLabel>
                                {page.title}
                            </IonLabel>
                        </IonItem>
                    )
                }
                {
                    (page.path === null) && (
                        <>
                        <IonItem 
                            button 
                            key={page.title} 
                            color={this.manageBtnColor()}                            
                            onClick={() =>{ document.getElementById('submenu').hidden=false }}   
                            >
                            {page.title}
                        </IonItem>
                        <IonItemGroup id='submenu' hidden={true} submenu >                            
                            {
                                page.submenu.map((subpage)=>(
                                    <IonItem submenu-item button end
                                        color={subpage.title === this.state.activePage ? 'primary' : ''}
                                        onClick={() => this.navigateToPage(subpage)}>
                                        <IonLabel>
                                            {subpage.title}
                                        </IonLabel>
                                    </IonItem>
                                ))
                            }
                        </IonItemGroup>
                        </>
                    )
                }
            </>
        ));
    }

    navigateToPage(page){
    	let local_history = this.state.history;
    	
        local_history.push(page.path);
        this.setState({activePage: page.title});
    }

    render (){
    return (
        <IonMenu contentId="main" class="main-menu" auto-hide={false}>
            <IonContent>
                <IonList>
                    {this.renderMenuItems()}
                    {(this.state.connected === true) && (
                    <IonItem  key='Log out' 
                        button
                        color='danger'
                        onClick={() => {
                            this.props.log_out();
                            this.navigateToPage(this.state.pages[0]);
                            }} >
                        <IonLabel>
                        Log out
                        </IonLabel>
                    </IonItem>
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







