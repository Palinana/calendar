import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import updateEventThunk  from '../store';
import dateFns from 'date-fns';

class UpdateEvent extends Component {
    constructor(props){
        super(props)
        this.state = {
            startTime: '',
            endTime: '',
            description: '',
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
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
    let id = this.props.id
    let body ={
        startTime: eventStartTime,
        endTime: eventEndTime,
        description: this.state.description,
        date: this.props.selectedDate
    }

    this.props.updateEvent(id, body);
    this.setState({
          startTime: '', 
          endTime: '', 
          description: ''
        });
    }

    render() {
        const {startTime, endTime} = this.state;
        const {hideForm} = this.props;
    
        return (
        <div className="form-container-update">
            <div className="form-content">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Start Time</label>
                        <input name="startTime"  defaultValue="12:00" type="time" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>End Time</label>
                        <input name="endTime"  defaultValue="12:00" type="time" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label>Description</label>
                        <input name="description" type="text" onChange={this.handleChange} />
                    </div>
                    <button type="submit" >Update</button>
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
        updateEvent(id, body) {
            dispatch(updateEventThunk(id, body))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);