import React, { Component } from 'react';

class AddEventForm extends Component {
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
        e.preventDefault();
        this.props.addNewEvent(this.state);
        this.setState({
            startTime: '', 
            endTime: '', 
            description: ''
        });
    }

    render(){
        const {startTime, endTime} = this.state;
        return(
            <div>
                <form>Add an event
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
                </form>
            </div>
        )
    }
}    

export default AddEventForm;