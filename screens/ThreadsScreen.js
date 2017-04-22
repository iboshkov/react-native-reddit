import App from '../components/App';
import React, { Component, View } from 'react';
import { Text } from 'react-native';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';


export default class ThreadScreen extends Component {

    constructor() {
        super();
    }

    render() {

        return (
            <App />
        )
    }
}