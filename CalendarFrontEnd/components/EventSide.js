import React from 'react';
import {Link} from 'react-router-dom';
import AddEventForm from '../components/AddEventForm';

const EventSide = (props) => {
  return (
    <div className="left-column-container">
      <div className="events-content">
          <h1>Friday<span>November 17</span></h1>
          <h2>No events planned for today</h2>
          <div className="events">
            <p>New Event<button className="add-event">+</button></p>
            {/* Check  if Events from DB are not emply -> then show them */}
            {/* <AddEventForm /> */}
            {/* <ul className="event-list"><li>Test</li></ul> */}
          </div>    
      </div>
    </div>
  );
};

export default EventSide;