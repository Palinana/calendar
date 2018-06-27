import React, {Component} from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import { getEvents } from '../store';
import EventForm from './EventForm';
import Events from './Events';

class Calendar extends Component{
    constructor (props) {
        super(props);
        this.state = {
            // today: new Date(),
            currentMonth: new Date(),
            selectedDate: new Date(),
            showPopup: false,
            showForm: false,
    }
      this.onDateClick = this.onDateClick.bind(this);
      this.hideForm = this.hideForm.bind(this);
      this.nextMonth = this.nextMonth.bind(this);
      this.prevMonth = this.prevMonth.bind(this);
      this.togglePopup = this.togglePopup.bind(this);
    }
      
    componentDidMount() {
        this.props.loadAllEvents();
    }
    //   getEventsForDay(theDay, allEvents) {
    //     let formattedDay = dateFns.format(theDay, 'MM-DD-YYYY')
    //     return allEvents.filter(event => {
    //       let formattedEvent = dateFns.format(event.date, 'MM-DD-YYYY')
    //       return formattedEvent === formattedDay
    //     })
    //   }
    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
          <div className="header row flex-middle">
            <div className="col col-start">
              <div className="icon" onClick={this.prevMonth}>
              <img src="../back.png" />
              </div>
            </div>
            <div className="col col-center">
              <span>
                {dateFns.format(this.state.currentMonth, dateFormat)}
              </span>
            </div>
            <div className="col col-end" onClick={this.nextMonth}>
              <div className="icon"><img src="../next.png" /></div>
            </div>
          </div>
        )
    }

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
    
        let startDate = dateFns.startOfWeek(this.state.currentMonth)
    
        for (let i = 0; i < 7; i++) {
          days.push(
            <div className="col col-center" key={i}>
              {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
            </div>
          )
        }
    
        return <div className="days row">{days}</div>
    }
      
    renderCells(allEvents) {

        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];
    
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let formattedEventsDate = "";
        let matchedEvents = [];

        console.log("All events ", allEvents )
   
        while (day <= endDate) {
          for (let i = 0; i < 7; i++) {
            formattedDate = dateFns.format(day, dateFormat);
            formattedEventsDate = dateFns.format(day, 'MM DD YYYY');
    
            const cloneDay = day;
            
            // let formattedDay = dateFns.format(day, 'MM-DD-YYYY')
            // console.log("Events!!!!!  ", allEvents )

            // const dayEvents = allEvents.filter(event => {
            //       let formattedEvent = dateFns.format(event.date, 'MM-DD-YYYY')
            //       return formattedEvent === formattedDay
            //     })
            
            // console.log("dayEvents!!!!!  ", dayEvents )
            // const dayEvents = this.getEventsForDay(day, allEvents);

            days.push(
              <div className={`col cell ${!dateFns.isSameMonth(day, monthStart) ? "disabled" : dateFns.isSameDay(day, selectedDate) ? "selected" : ''}`} key={day} onClick={() => this.onDateClick(dateFns.parse(cloneDay))}>
              <span>{formattedDate}</span>
              {/* <Events dayEvents={allEvents}/> */}
              </div>
            )
            day = dateFns.addDays(day, 1);
          }
          rows.push(
            <div className="row" key={day}>
              {days}
            </div>
          )
          days = [];
        }
    
        return <div className="body">{rows}</div>
    }

    formatDate() {
        const {selectedDate} = this.state
        var month = selectedDate.getMonth() + 1
        var day = selectedDate.getDate()
        var year = selectedDate.getFullYear()

        if (month < 10) {
            month = '0' + month
        }
        if (day < 10) {
            day = '0' + day
        }
        this.setState({
            date: year + '-' + month + '-' + day
        })

    } 
    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        })
    }

    onDateClick(day) {
        this.setState({
          selectedDate: day
        })
        this.togglePopup();
    }
    
    nextMonth() {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    }

    prevMonth() {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    }

    onDateClick(day){
        const {currentMonth} = this.state;
        this.formatDate()
        this.setState({selectedDate: day, showForm: true});
    };

    hideForm(){
        this.setState({showForm: false})
    }
    
    render(){
        return(
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells(this.props.events)}
                {this.state.showForm ? <EventForm hideForm={this.hideForm} selectedDate={this.state.selectedDate} />: ''}
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
        loadAllEvents: function() {
            dispatch(getEvents())
          }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);