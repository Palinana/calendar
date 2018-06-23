import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// const months = ['January', 'February', 'March', 'April','May', 'June', 'July', 'August', 'September',
// 'October', 'November', 'December'];
// const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const months = {January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30, December: 31};

class CalendarSide extends Component {
    constructor(props){
        super(props);
        this.state = {
            month: 'November'
        };
    }

    render(){
        // const month = this.state.month;
        let now = new Date();
        let str = now.toString().slice(0, 15);
        let words = str.split(" "); //[ 'Wed', 'Jun', '20', '2018' ]
        let month = words[1];
        let todayDate = words[2];
        let year = words[3];
        let weekDay = words[0];
        const days = Array.from({length: months['November']}, (v, k) => k + 1) ;//array of days
        const monthName = Object.keys(months);

        let dateCompare = (elem) => todayDate === elem;
        
        return (
            <div className="right-column-container">
                <div className="calendar-content">
                    <h2 className="year">{year}</h2>
                    <ul className="month">
                        {
                            monthName.map(month => <li key={month}>{month.slice(0,3)}</li>)
                        }
                    </ul>
                    <ul className="weekday">
                        {
                            daysOfTheWeek.map(day => <li key={day}>{day}</li>)
                        }
                    </ul>
                    <ul className="days">
                        {
                            days.map(day => <li key={day}><Link to={`/${day}/form`} className="calendar-day">{day}</Link></li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default CalendarSide;