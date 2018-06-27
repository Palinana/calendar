import React, { Component } from 'react';
import dateFns from 'date-fns';
import { getEvents } from '../store';

class Events extends Component {

  renderEvents(theDay, events) {
    var tempArr = [];
    Object.keys(events).map((e,idx) => {
        var item = events[e];
        tempArr.push(item)
    })
    let formattedDay = dateFns.format(theDay, 'MM-DD-YYYY')
      return tempArr.filter(event => {
        let formattedEvent = dateFns.format(event.date, 'MM-DD-YYYY')
          return formattedEvent === formattedDay
      }).map((e,idx) => {
        let start = dateFns.format(e.startTime, 'h:mm a')
        let end = dateFns.format(e.endTime, 'h:mm a')
        return (
          <div className="event-list" key={idx}>
            {`${start}-${end}`} <strong> - {e.description} </strong>
          </div>
         )
    })
  }

  render() {
    return (
      <div>
        {this.renderEvents(this.props.day, this.props.dayEvents)}
      </div>
    )
  }
}

export default Events