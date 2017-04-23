/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function run() {
    registerScreens();

    let icons = {};

    Icon.getImageSource('list-alt', 20, 'red')
        .then(source => icons['subreddit_list'] = source)
        .then(() => MaterialIcon.getImageSource('menu', 20, 'red'))
        .then(source => icons['menu'] = source)
        .then(() => {
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

                    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
                    navigatorButtons: {
                        leftButtons: [
                            {
                                id: 'sideMenu', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
                                icon: icons["menu"], // for icon button, provide the local image asset name
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
}
