import axios from 'axios';

//ACTIONS
const GET_EVENTS = 'GET_EVENTS';
const ADD_EVENT = 'ADD_EVENT';

//ACTION CREATORS
const getEvents = events => {
    return {
      type: GET_EVENTS,
      events
    };
};

const addEvent = event => {
    return {
      type: ADD_EVENT,
      event
    };
};

//THUNK CREATORS
export const fetchAllEvents = () => {
    return dispatch => axios.get('/api/events')
    .then(events => events.data)
    .then(events => dispatch(getEvents(events)))
    .catch(err => console.log(err));
}

export const postEvent = (event, history, id) => {
    return dispatch => {
      const eventData = Object.assign({}, event, {id});
      return axios.post('/api/events', eventData)
      .then(event => event.data)
      .then(event => {
        dispatch(addEvent(event));
        history.push('/');
      })
      .catch(err => console.log(err));
  }
};

//REDUCER
export default function(state = [], action){
    switch (action.type) {
        case GET_EVENTS:
            return action.events;
        case ADD_EVENT:
            return [...state, action.event];
        default:
            return state;
    }
};