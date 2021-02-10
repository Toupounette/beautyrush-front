import React from 'react';

import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class BeautyScheduler extends React.Component{
    constructor(props){
        super(props);

        console.log("props = ", props);

        this.state = {
            type: props.type,
            identifier: props.identifier
        }
    }

    retrieveappointments(){
        const method = "GET";
        var xhttp = new XMLHttpRequest();

        let url = process.env.REACT_APP_API_SCHEMA + "://" + process.env.REACT_APP_API_IP + ":" + process.env.REACT_APP_API_PORT + '/' + this.state.type + '/' + this.state.identifier +'/appointments';
      
        console.log("url = ", url);

        xhttp.open(method, url, false);
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

        let calendar = 
           (<Calendar
                events={this.retrieveappointments()}
                views={["month", "week", "day"]}
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