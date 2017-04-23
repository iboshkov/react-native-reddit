import App from '../components/App';
import React, { Component } from 'react';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import BaseScreen from './BaseScreen';
import { connect } from 'react-redux';
import * as ThreadListActions from '../actions/thread_list';

import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Picker,
    ToastAndroid,
    ActivityIndicator,
    Dimensions,
    RefreshControl,
    Animated,
    Slider

} from 'react-native';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import ThreadList from '../components/ThreadList'

import { Container, Header, StyleProvider, Text, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

class ThreadScreen extends BaseScreen {

    constructor(props) {
        super(props);
        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            refreshing: false,
            drawerOpen: false
        };
    }

    componentDidMount() {

    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.threadListReload(this.props.selectedSubreddit);
    }

    render() {

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{
                    backgroundColor: '#FFF'
                }}>
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isLoading}
                                onRefresh={this._onRefresh.bind(this)}
                            />}
                    >
                        <ThreadList navigator={this.props.navigator} refreshing={this.state.refreshing} />
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        items: state.threads || [],
        hasErrored: state.threadListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        selectedThread: state.selectedThread,
        isLoading: state.threadListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        threadListReload: (subreddit) => dispatch(ThreadListActions.threadListReload(subreddit)),
        //subredditChanged: (url) => dispatch(SubredditActions.subredditChanged(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadScreen);
