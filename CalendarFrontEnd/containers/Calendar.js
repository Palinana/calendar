import React, {Component} from 'react';
import { connect } from 'react-redux';
import { CalendarSide, EventSide, AddEventForm} from '../components';
import { fetchAllEvents } from '../store';


class Calendar extends Component{

    render(){

        return(
            <div className="main-container">
                <EventSide />
                <CalendarSide />
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        events: state.events
    };
};
  
const mapDispatchToProps = dispatch => {
    return {
        getAllEvents: () => dispatch(fetchAllEvents())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);