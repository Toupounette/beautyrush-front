import React from 'react';

import { 
    IonMenu, 
    IonContent, 
    IonList, 
    IonLabel, 
    IonItem,
    IonItemGroup,
    IonIcon,
    IonMenuToggle
} from "@ionic/react";

import { 
    home,
    logOut,
    create,
    informationCircle,
    chatbox,
    person,
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
                { title: 'Home', path: '/', icon: home },
                { title: 'Sign in', path: '/signIn', icon: logIn },
                { title: 'Sign up', path: '/signUp', icon: create },
                { title: 'About', path: '/about', icon: informationCircle },
                { title: 'General Terms', path: '/generalterms', icon: informationCircle },
                { title: 'Legal Mentions', path: '/legalmentions', icon: informationCircle },
                { title: 'Privacy Policy', path: '/privacypolicy', icon: informationCircle }
                
            ];
        }
        else
        {

            switch(this.state.role){
                case 'admin':
                    {
                        this.state.pages = [
                            { title: 'Home', path: '/', icon: home },
                            { title: 'Admin', path: '/admin', icon: chatbox  },
                            { title: 'About', path: '/about', icon: informationCircle },
                            { title: 'General Terms', path: '/generalterms', icon: informationCircle },
                            { title: 'Legal Mentions', path: '/legalmentions', icon: informationCircle },
                            { title: 'Privacy Policy', path: '/privacypolicy', icon: informationCircle }
                        ] ;
                        break;
                    }
                case 'client':
                    {
                        this.state.pages = [
                            { title: 'Home', path: '/', icon: home },
                            { title: 'Comment', path: '/comments', icon: chatbox },
                            { title: 'Schedule', path: '/schedule', icon: calendar },
                            { title: 'Account', path: '/account', icon: person },
                            { title: 'About', path: '/about', icon: informationCircle },
                            { title: 'General Terms', path: '/generalterms', icon: informationCircle },
                            { title: 'Legal Mentions', path: '/legalmentions', icon: informationCircle },
                            { title: 'Privacy Policy', path: '/privacypolicy', icon: informationCircle }
                        ] ;
                        break;
                    }
                case 'provider':
                    {
                        this.state.pages = [
                            { title: 'Home', path: '/', icon: home },
                            { title: 'Comment', path: '/comments', icon: chatbox },
                            { title: 'Schedule', path: '/schedule', icon: calendar },
                            { title: 'Portfolio', path: '/portfolio', icon: images },
                            { title: 'Services', path: '/services', icon: colorWand },
                            { title: 'Account', path: '/account', icon: person },
                            { title: 'About', path: '/about', icon: informationCircle },
                            { title: 'General Terms', path: '/generalterms', icon: informationCircle },
                            { title: 'Legal Mentions', path: '/legalmentions', icon: informationCircle },
                            { title: 'Privacy Policy', path: '/privacypolicy', icon: informationCircle }
                        ] ;
                        break;
                    }
                default:
                    {
                        console.warn("Invalid role : " + this.state.role);
                    }
            }
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
                            <IonIcon class="pop" icon={page.icon}/>
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
                                {page.title}
                            </IonLabel>
                            <IonIcon class="pop" icon={page.icon}/>
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
                                        <IonIcon class="pop" icon={subpage.icon}/>
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
        <IonMenu contentId="main" class="main-menu" >
            <IonContent>
                <IonList>
                    <IonMenuToggle auto-hide='true'>
                        {this.renderMenuItems()}
                        {(this.state.connected === true) && (
                        <IonItem  key='Log out' 
                            button
                            toggle
                            color='danger'
                            onClick={() => {
                                this.props.log_out();
                                this.navigateToPage(this.state.pages[0]);
                                }} >
                            <IonLabel>
                                Log out
                            </IonLabel>
                            <IonIcon class="pics" icon={logOut}/>
                        </IonItem>
                        )}
                    </IonMenuToggle>
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













