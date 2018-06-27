import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Calendar from './components/Calendar';
// import AddEventForm from './components/AddEventForm';

const Routes = (props) => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={Calendar} />
                {/* <Route path="/:id" component={AddEventForm} /> */}
            </Switch>
        </Router>
    )
}

export default Routes;