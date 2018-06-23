import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import events from './events';

const reducer = combineReducers({events});
const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './events';