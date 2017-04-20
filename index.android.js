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
  Picker,
  ToastAndroid
} from 'react-native';
import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import SubredditList from './components/SubredditList';
import ThreadList from './components/ThreadList';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

export default class AwesomeProject extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    ToastAndroid.show("test", ToastAndroid.SHORT);
  }

  render() {
    let store = createStore(rootReducer, applyMiddleware(thunk));

    return (
      <Provider store={store}>
        <View style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: '#3F3E4E',
        }}>
          <SubredditList />
          <ThreadList />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F3E4E',
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
