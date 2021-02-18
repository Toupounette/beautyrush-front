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
    IonDatetime
} from '@ionic/react';

class BeautyScheduler extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: props.role,
            identifier: props.identifier,
            calendarType: (props.calendarType !== undefined) ? props.calendarType : null,
            providerServices: props.providerServices,
            providerInfo: props.providerInfo,
            appointmentDetail:{
                show: false,
                header: '',
                message: ''
            },
            newAppointment:{
                show: false,
                selectedService: null,
                selectedMoment: null
            }
        }

        this.handleShowAppointment = this.handleShowAppointment.bind(this);
        this.handleAddAppointment = this.handleAddAppointment.bind(this);
        this.handleSaveAppointment = this.handleSaveAppointment.bind(this);
        this.handleExitModal = this.handleExitModal.bind(this);
    }

    retrieveAppointments(){
        const token = store.getState().userAccount.token;
        const method = "GET";
        let xhttp = new XMLHttpRequest();

        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.role + 's/' + this.state.identifier +'/appointments';
        xhttp.open(method, url, false);
        
        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }

        xhttp.send(); 

        const jsonResponse = JSON.parse(xhttp.responseText);

        const appointments = jsonResponse.map((appointment) =>(
            {
                id: appointment.a_id,
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
        // complexifier le if pour masquer les details du rdv pour les clients et autres providers
        if(! this.isAllowedToSeeDetails())
        {
            return
        }
        
        this.setState({
            appointmentDetail:{
                show: true,
                header: moment(event.start).format('DD/MM/YYYY HH:mm'),
                message: event.title
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
        console.log("appointmentMoment = ", appointmentMoment);
        const appointmentData = {
            moment: appointmentMoment,
            service_id: (document.getElementById("user_service_selected")).value,
            provider_id: this.state.identifier,
            client_id: store.getState().userAccount.id,
        }

        const token = store.getState().userAccount.token;
        const method = "POST";    
        let xhttp = new XMLHttpRequest();    
        const url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + "/clients/" + store.getState().userAccount.id + "/appointments";
    
        xhttp.open(method, url, false);
        xhttp.setRequestHeader("Content-Type", "application/json");

        if(token !== null)
        {
            xhttp.setRequestHeader("Authorization", token);
        }
        xhttp.send(JSON.stringify(appointmentData));

        // TODO : success and error toast
        //return JSON.parse(xhttp.responseText); 
        this.handleExitModal();
        this.forceUpdate();
    }

    handleExitModal(){
        this.setState({
            newAppointment:{
                show: false
            }
        })
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
             />
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
             
         </IonContent>
       );
    }
}

export default BeautyScheduler;