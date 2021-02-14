import React from 'react';

import store from "../redux/store";

import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class BeautyScheduler extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            role: props.role,
            identifier: props.identifier
        }
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

    render(){
        const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
            style: {
            backgroundColor: 'lightblue',
            },
        })

        const calendar = 
           (<Calendar
                events={this.retrieveAppointments()}
                views={{work_week: true, month: true}}
                defaultDate={new Date()}
                localizer={momentLocalizer(moment)}
                style={{ height: 500 }}
                components={{
                  timeSlotWrapper: ColoredDateCellWrapper,
                }}
          />);

        return calendar;
    }
}

export default BeautyScheduler;