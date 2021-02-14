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
    IonItemDivider,
    IonIcon
} from "@ionic/react";

import { 
    home,
    logOut,
    create,
    informationCircle,
    chatbox,
    person,
    cog,
    images,
    calendar,
    colorWand,
    logIn
 } from 'ionicons/icons';

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
                { title: 'Home', path: '/', icon: home, submenu: [] },
                { title: 'Sign in', path: '/signIn', icon: logIn, submenu: [] },
                { title: 'Sign up', path: '/signUp', icon: create, submenu: [] },
                { title: 'About', path: '/about', icon: informationCircle, submenu: [] },
                
            ];
        }
        else
        {
            let userSubmenu = [];

            switch(this.state.role){
                case 'admin':
                    {
                        userSubmenu = [
                            { title: 'User comments', path: '/admincomments', icon: chatbox, submenu: [] },
                            { title: 'User accounts', path: '/adminaccounts', icon: person, submenu: [] },
                        ] ;
                        break;
                    }
                case 'client':
                    {
                        userSubmenu = [
                            { title: 'Comment', path: '/comments', icon: chatbox, submenu: [] },
                            { title: 'Schedule', path: '/schedule', icon: calendar, submenu: [] },
                            { title: 'Account', path: '/account', icon: person, submenu: [] },
                        ] ;
                        break;
                    }
                case 'provider':
                    {
                        userSubmenu = [
                            { title: 'Comment', path: '/comments', icon: chatbox, submenu: [] },
                            { title: 'Schedule', path: '/schedule', icon: calendar, submenu: [] },
                            { title: 'Portfolio', path: '/portfolio', icon: images, submenu: [] },
                            { title: 'Services', path: '/services', icon: colorWand, submenu: [] },
                            { title: 'Account', path: '/account', icon: person, submenu: [] },
                        ] ;
                        break;
                    }
                default:
                    {
                        console.warn("Invalid role : " + this.state.role);
                    }
            }

            this.state.pages = [
                { title: 'Home', path: '/', icon: home, submenu: [] },
                {title: 'Manage', path: null, icon: cog,  submenu: userSubmenu },
                { title: 'About', path: '/about', icon: informationCircle, submenu: [] }
                
            ];
        }
        
        return this.state.pages.map((page) => (
            <>
                {
                    (page.path !== null) && (                        
                        <IonItem button           
                        color={this.state.activePage === page.title  ? 'primary' : ''}
                            onClick={() => this.navigateToPage(page)}>             
                            <IonIcon icon={page.icon}  />
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
                            onClick={() =>{ document.getElementById('submenu').hidden=false }}   >  
                            <IonLabel>
                            <IonIcon icon={page.icon}/>
                                {page.title}
                            </IonLabel>
                        </IonItem>
                        <IonItemGroup id='submenu' hidden={true} submenu >                            
                            {
                                page.submenu.map((subpage)=>(
                                    <IonItem submenu-item button end
                                        color={subpage.title === this.state.activePage ? 'primary' : ''}
                                        onClick={() => this.navigateToPage(subpage)}>
                                            <IonIcon icon={subpage.icon}/>
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
                            <IonIcon icon={logOut}/>
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












