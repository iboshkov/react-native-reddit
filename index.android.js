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
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

let store = createStore(rootReducer, applyMiddleware(thunk));
import registerScreens from './screens';
registerScreens();

let icons = {};

Icon.getImageSource('list-alt', 20, 'red')
  .then(source => icons['subreddit_list'] = source)
  .then(() => {
    console.log(icons);
    Navigation.startSingleScreenApp({
      drawer: { // optional, add this if you want a side menu drawer in your app
        left: { // optional, define if you want a drawer from the left
          screen: 'Sidebar' // unique ID registered with Navigation.registerScreen
        },
        disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
      },

      screen: {
        screen: 'ThreadsScreen', // this is a registered name for a screen
        navigatorStyle: {
          navBarButtonColor: 'white', // Change color of nav bar buttons (eg. the back button) (remembered across pushes)

        }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
        navigatorButtons: {
          leftButtons: [
            {
              id: 'sideMenu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
              buttonColor: 'blue',
            }
          ],
          rightButtons: [
            {
              icon: icons["subreddit_list"], // for icon button, provide the local image asset name
              id: 'add' // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
            }
          ]
        }, // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
        title: 'Screen One'
      }

    });

  });


/*


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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);*/
