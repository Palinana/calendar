import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import { postEvent, deleteEventThunk } from '../store';
import dateFns from 'date-fns';

class EventForm extends Component {
    constructor(props) {
        super(props);
          this.state = {
            startTime: '',
            endTime: '',
            description: ''
          };
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
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

      this.props.onAddEvent(body);
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


    render() {
      const {startTime, endTime} = this.state;
      const {hideForm} = this.props;
        return (
          <div className="form-container">
              <div className="form-content">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Start Time</label>
                        <input name="startTime" type="time" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input name="endTime" type="time" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input name="description" type="text" onChange={this.handleChange} />
                    </div>
                    <button type="submit" disabled={startTime >= endTime}>Add</button>
                    <button onClick={hideForm}>Cancel</button>
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
    onAddEvent(body) {
      dispatch(postEvent(body))
    },
    onDeleteEvent(id) {
      dispatch(deleteEventThunk(id))
    }
  }
}
export default EventForm = connect(mapStateToProps, mapDispatchToProps)(EventForm)