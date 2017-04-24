/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { BackAndroid } from 'react-native';

import { Navigation } from 'react-native-navigation';
import registerScreens from './screens';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function run() {

    registerScreens();

    let icons = {};

    Icon.getImageSource('list-alt', 20, 'white')
        .then(source => icons['subreddit_list'] = source)
        .then(() => MaterialIcon.getImageSource('menu', 20, 'white'))
        .then(source => icons['menu'] = source)
        .then(() => {
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        label: 'Subreddit', // tab label as appears under the icon in iOS (optional)
                        screen: 'ThreadsScreen', // this is a registered name for a screen
                        icon: icons["menu"], // local image asset for the tab icon unselected state (optional on iOS)
                        selectedIcon: icons["menu"], // local image asset for the tab icon selected state (optional, iOS only. On Android, Use `tabBarSelectedButtonColor` instead)
                        title: 'Frontpage', // title of the screen as appears in the nav bar (optional)
                        navigatorStyle: {}, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
                        navigatorButtons: {} // override the nav buttons for the tab screen, see "Adding buttons to the navigator" below (optional)
                    },
                    {
                        label: 'Thread',
                        screen: 'CommentsScreen', // this is a registered name for a screen
                        icon: icons["menu"],
                        selectedIcon: icons["menu"],
                        title: 'Comments'
                    }
                ],
                drawer: { // optional, add this if you want a side menu drawer in your app
                    left: { // optional, define if you want a drawer from the left
                        screen: 'Sidebar' // unique ID registered with Navigation.registerScreen
                    },
                    disableOpenGesture: false // optional, can the drawer be opened with a swipe instead of button
                },
                tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
                    tabBarButtonColor: '#ffff00', // optional, change the color of the tab icons and text (also unselected)
                    tabBarSelectedButtonColor: '#ff9900', // optional, change the color of the selected tab icon and text (only selected)
                    tabBarBackgroundColor: '#551A8B' // optional, change the background color of the tab bar
                },
                appStyle: {
                    orientation: 'portrait' // Sets a specific orientation to the entire app. Default: 'auto'. Supported values: 'auto', 'landscape', 'portrait'
                },
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                animationType: 'slide-down' // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
            });
            return;

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
