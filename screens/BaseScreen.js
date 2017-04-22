import SubredditList from '../components/SubredditList';
import React, { Component, View } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import material from '../native-base-theme/variables/platform';
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';


export default class BaseScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'sideMenu':
                break;
        }
    }

}