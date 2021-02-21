import React from 'react';

import store from "../redux/store";

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { 
    IonContent, 
    IonModal,
    IonLabel,
    IonAlert,
    IonButton,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonDatetime,
    IonToast,
    IonTextarea
} from '@ionic/react';

import BeautyComment from './BeautyComment'

class BeautyScheduler extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: props.role,
            identifier: props.identifier,
            token: store.getState().userAccount.token,
            calendarType: (props.calendarType !== undefined) ? props.calendarType : null,
            providerServices: props.providerServices,
            providerInfo: props.providerInfo,
            appointmentDetail:{
                show: false,
                header: '',
                message: '',
                canComment: false,
                id: null
            },
            newAppointment:{
                show: false,
                selectedService: null,
                selectedMoment: null
            },
            newComment:{
                show: false,
                text: ''
            },
            showToastError: false,
            showToastSuccess: false,
            toastErrorMessage: ''
        }

        this.handleShowAppointment = this.handleShowAppointment.bind(this);
        this.handleAddAppointment = this.handleAddAppointment.bind(this);
        this.handleSaveAppointment = this.handleSaveAppointment.bind(this);
        this.handleExitModal = this.handleExitModal.bind(this);
        this.handleDeleteAppointment = this.handleDeleteAppointment.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
    }

    retrieveAppointments(){
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier +'/appointments';
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        } 

        const jsonResponse = JSON.parse(xhttp.responseText);

        const appointments = jsonResponse.map((appointment) =>(
            {
                id: appointment.a_ID,
                title: appointment.title + " with " + appointment.name,
                allDay:false,
                start:  new Date(appointment.moment),
                end:  new Date(appointment.moment)
            }
        ));

        return appointments;
    }

    handleShowAppointment(event){
        // Anonymous user cannot see apppointment detail
        if(! this.isAllowedToSeeDetails())
        {
            return
        }
        
        this.setState({
            appointmentDetail:{
                show: true,
                header: moment(event.start).format('DD/MM/YYYY HH:mm'),
                message: event.title,
                canComment: (moment(event.start) < moment()),
                id: event.id
            }
        });
    }

    handleAddAppointment(eventSlot){
        // Non-client user cannot schedule a apppointment
        if(! this.isAllowedToAddAppointment())
        {
            return
        }

        let presumedSlot = moment(eventSlot.start).add(10, 'hours')
        
        this.setState({
            newAppointment:{
                show: true,
                selectedMoment: presumedSlot.format('DD/MM/YYYY HH:mm')
            }
        });
    }

    handleSaveAppointment(){
        // Non-client user cannot schedule a apppointment
        if(! this.isAllowedToAddAppointment())
        {
            return
        }

        const date_selected = (document.getElementById("user_date_selected")).value;
        const time_selected = (document.getElementById("user_time_selected")).value;
        const appointmentMoment = moment(date_selected + " " + time_selected)
        const appointmentData = {
            moment: appointmentMoment,
            service_id: (document.getElementById("user_service_selected")).value,
            provider_id: this.state.identifier,
            client_id: store.getState().userAccount.id,
        }

        const method = "POST";    
        let xhttp = new XMLHttpRequest();    
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/clients/" + store.getState().userAccount.id + "/appointments";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }        

        try{
            xhttp.send(JSON.stringify(appointmentData)); 

            if(xhttp.status === 200){
                this.setState({showToastSuccess: true});
            }
            else{
                this.setState({showToastError: true, toastErrorMessage: "Cannot add this appointment. Try later" });            
            }
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        }
        
        this.handleExitModal();
    }

    handleExitModal(){
        this.setState({
            newAppointment:{
                show: false
            }
        })
    }

    handleDeleteAppointment(){
        const method = "DELETE";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier +'/appointments/' + this.state.appointmentDetail.id;
        xhttp.open(method, url, false);
        
        if(this.state.token !== null)
        {
            xhttp.setRequestHeader("Authorization", this.state.token);
        }

        try{
            xhttp.send(); 
        }
        catch(err) {
            this.setState({showToastError: true, toastErrorMessage: "No server connection"});
        } 

        this.forceUpdate();
    }

    handleAddComment(){
        this.setState({
            newComment:{
                show: true
            }
        });
    }

    isAllowedToAddAppointment(){
        switch (this.state.calendarType)
        {
            case 'clientSearchResult': {
                return true;
            }
            case 'clientAccount': 
            case 'providerAccount': 
            default : {
                return false;
            }
        }
    }
    
    isAllowedToSeeDetails(){
        if(this.state.role === 'client' && this.state.calendarType === 'clientAccount')
        {
            return true;
        }
        else if(this.state.role === 'provider' && this.state.calendarType === 'providerAccount')
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    renderServicesSelect(){
        return this.state.providerServices.map((service)=>(
            <IonSelectOption value={service.id}>{service.title}</IonSelectOption>
        ));
    }

    render(){
        const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
            },
        });
        
        return (
         <IonContent>
             <Calendar
                     selectable={this.state.identifier !== null}
                     onSelectEvent={event => this.handleShowAppointment(event)}
                     onSelectSlot={this.handleAddAppointment}
                     events={this.retrieveAppointments()}
                     views={{work_week: true, month: true}}
                     defaultDate={new Date()}
                     localizer={momentLocalizer(moment)}
                     style={{ height: 500 }}
                     components={{
                     timeSlotWrapper: ColoredDateCellWrapper,
                     }}
             />
             <IonAlert 
                isOpen={this.state.appointmentDetail.show}
                onDidDismiss={() => this.setState({
                    appointmentDetail: {
                        show: false
                    }
                })}
                header={this.state.appointmentDetail.header}
                message={this.state.appointmentDetail.message}
                buttons={ this.state.appointmentDetail.canComment ? 
                    ['OK',
                {
                    text: 'Comment',
                    color: 'warning',
                    handler: this.handleAddComment
                }]
                :
                ['OK',
                {
                    text: 'Delete',
                    color:'danger',
                    handler: this.handleDeleteAppointment
                }]
            }
             />
             <IonModal 
                isOpen={this.state.newComment.show}
                swipeToClose={true}
                onDidDismiss={()=>{ this.setState({newComment:{show: false}}) }}             
            >
                <BeautyComment appointmentID={this.state.appointmentDetail.id}  closeModal={ () =>{ this.setState({newComment:{show: false}}) }} />
            </IonModal>
             { 
                (this.state.calendarType === 'clientSearchResult') && (
                    <IonModal
                    isOpen={this.state.newAppointment.show}
                    swipeToClose={true}
                    onDidDismiss={this.handleExitModal}
                 >
                     <IonLabel>Book {this.state.providerInfo.name} for</IonLabel>
                     <IonSelect id='user_service_selected'  aria-required onIonChange={(event) => {console.log('event', event)}}  >
                         {this.renderServicesSelect()}
                     </IonSelect>
                     <IonLabel>on</IonLabel>
                     <IonItem>
                        <IonDatetime id='user_date_selected' value={this.state.newAppointment.selectedMoment} displayFormat="DD/MM/YYYY" pickerFormat="DD/MM/YYYY" ></IonDatetime>
                        <IonLabel>at</IonLabel>
                        <IonDatetime id='user_time_selected' value={this.state.newAppointment.selectedMoment} displayFormat="HH:mm" pickerFormat="HH:mm" ></IonDatetime>
                        </IonItem>
                     <IonToolbar>                     
                        <IonButton onClick={this.handleExitModal} color='warning' >Cancel</IonButton>
                        <IonButton onClick={this.handleSaveAppointment} color='success' >Validate</IonButton>
                     </IonToolbar>
                 </IonModal> 
                )
             }
             <IonToast color="success"
             isOpen={this.state.showToastSuccess}
             onDidDismiss={() => {
                 this.setState({ showToastSuccess : false });
                 this.forceUpdate();
                }}
             message="Appointment added"
             duration={1000}
             />
                
             <IonToast color="danger"
             isOpen={this.state.showToastError}
             onDidDismiss={() => this.setState({ showToastError : false })}
             message= {this.state.toastErrorMessage}
             duration={1000}
             />
             
         </IonContent>
       );
    }
}

export default BeautyScheduler;