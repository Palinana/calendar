import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import { postEvent, deleteEventThunk } from '../store';
import dateFns from 'date-fns';
import UpdateEvent from './UpdateEvent';

class EventForm extends Component {
    constructor(props) {
        super(props);
          this.state = {
            startTime: '',
            endTime: '',
            description: '',
            edit: false
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleFormShowOnClick = this.handleFormShowOnClick.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
      let eventStartTime = new Date(this.props.selectedDate);
      let eventEndTime = new Date(this.props.selectedDate);
      let startHour = this.parseHour(this.state.startTime);
      let startMin = this.parseMin(this.state.startTime);
      let endHour = this.parseHour(this.state.endTime);
      let endMin = this.parseMin(this.state.endTime);

      eventStartTime.setHours(startHour);
      eventStartTime.setMinutes(startMin);
      eventEndTime.setHours(endHour);
      eventEndTime.setMinutes(endMin);

      e.preventDefault();
        let body ={
          startTime: eventStartTime,
          endTime: eventEndTime,
          description: this.state.description,
          date: this.props.selectedDate
      }

      this.props.addEvent(body);
        this.setState({
            startTime: '', 
            endTime: '', 
            description: ''
      });
    }

    parseHour(timeStr) {
      let idx = 0;
      let hour = ''
      if (timeStr === 0) {
        return 13
      } else if (timeStr.indexOf(':') === -1) {
        return Number(timeStr)
      } else {
        idx = timeStr.indexOf(':')
        hour = timeStr.slice(0,idx)
      }
      return Number(hour)
    }

    parseMin(timeStr) {
      if (timeStr === 0) {
        return 0
      } else {
        let idx = timeStr.indexOf(':')
        let minutes = timeStr.slice(idx+1)
        return Number(minutes)
      }
    }

    handleFormShowOnClick() {
      this.setState({ edit: true })
    }

    renderEvents(events) {
      let formattedDay = dateFns.format(this.props.selectedDate, 'MM-DD-YYYY');
        let daysEvents = this.props.allEvents.filter(event => {
          let formattedEventDay = dateFns.format(event.date, 'MM-DD-YYYY')
          return formattedDay === formattedEventDay
        })

        if (!daysEvents.length) {
          return <div className="no-events">No events for today</div>
        } 
        else {
          return daysEvents.map((e,idx) => {
            let start = dateFns.format(e.startTime, 'h:mm a')
            let end = dateFns.format(e.endTime, 'h:mm a')
            return (
              <div className="events-list" key={idx}>
                {`${start}-${end}`} <strong> - {e.description}  </strong>
                <Link to={`/event/delete/${e.id}`} onClick={() => this.props.deleteEvent(e.id)} className="delete-link">delete</Link>
                <button className="edit-btn" onClick={this.handleFormShowOnClick}>edit</button>
                {
                  this.state.edit &&
                  <div className="event-form">
                      <UpdateEvent hideForm={this.props.hideForm} id={e.id} selectedDate={this.state.selectedDate}/>
                      </div>
                    }              
              </div>
            )
          })
        }  
    }


    render() {
      const {startTime, endTime} = this.state;
      const {hideForm} = this.props;
    
      return (
        <div className="form-container">
            <div className="form-content">
              <div>{this.renderEvents(this.props.allEvents)}</div>
              <form onSubmit={this.handleSubmit}>
                  <div>
                      <label>Start Time</label>
                      <input name="startTime" defaultValue="12:00" type="time" onChange={this.handleChange} />
                  </div>
                  <div>
                      <label>End Time</label>
                      <input name="endTime" defaultValue="12:00" type="time" onChange={this.handleChange} />
                  </div>
                  <div>
                      <label>Description</label>
                      <input name="description" type="text" onChange={this.handleChange} />
                  </div>
                  <button type="submit" disabled={startTime >= endTime}>Add</button>
                  <Link to='/events'><button onClick={hideForm}>Exit</button></Link>
              </form>
              </div>
          </div>
      )
    }
}

const mapStateToProps = (state) => {
    return {
      allEvents: state.events
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent(body) {
      dispatch(postEvent(body))
    },
    deleteEvent(id) {
      dispatch(deleteEventThunk(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventForm);
