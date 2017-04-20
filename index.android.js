/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Picker
} from 'react-native';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import SubredditList from './components/SubredditList';
import ThreadList from './components/ThreadList';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import Sidebar from 'react-native-sidebar';
const SideMenu = require('react-native-side-menu');
import { connect } from 'react-redux';
import App from './components/App';

let store = createStore(rootReducer, applyMiddleware(thunk));


export default class AwesomeProject extends Component {
  constructor() {
    super();
  }
  render() {

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
