import React from 'react';

import moment from 'moment';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

class BeautyScheduler extends React.Component{
    constructor(props){
        super(props);

        this.state = {  }
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
                events={[]}
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