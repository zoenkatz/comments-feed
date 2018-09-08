import React from 'react'
import ReactDOM from 'react-dom'
import './Styles.css'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { Router, browserHistory } from 'react-router';
//import {loadPosts} from './actions/index.js'
import thunk from 'redux-thunk';

import * as api from './utils/api'
//import {loadCategories} from "./actions/index";
import * as actions from './actions/index.js'
import history from './history'

let state = {};


const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    state = store.getState();
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    return createStore(
        reducer,
        composeEnhancers(
            applyMiddleware(thunk)
        )
    )
};

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter><App /></BrowserRouter>
    </Provider>,
    document.getElementById('root')
);