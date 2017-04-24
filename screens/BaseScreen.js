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
    componentDidMount() {
        this.props.navigator.toggleTabs({
            to: 'hidden', // required, 'hidden' = hide tab bar, 'shown' = show tab bar
            animated: false // does the toggle have transition animation or does it happen immediately (optional)
        });
    }
    onNavigatorEvent(event) {
        switch (event.id) {
            case 'sideMenu':
                this.props.navigator.toggleDrawer({
                    side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
                    animated: true, // does the toggle have transition animation or does it happen immediately (optional)
                });
                break;
        }
    }

}