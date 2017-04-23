import App from '../components/App';
import React, { Component } from 'react';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import BaseScreen from './BaseScreen';
import { connect } from 'react-redux';
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
import CommentList from '../components/CommentList'
import * as CommentListActions from '../actions/comment_list';

import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, StyleProvider } from 'native-base';


class CommentsScreen extends BaseScreen {
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
        this.props.commentListReload(this.props.selectedThread);
    }

    render() {
        let thread = this.props.thread;

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
                        <Card >
                            <CardItem>
                                <Left>
                                    {thread.preview && (
                                        <Thumbnail source={{ 'uri': thread.preview.images[0].source.url }} />
                                    )}
                                    <Body>
                                        <Text>{thread.title}</Text>
                                        <Text note>by: /u/{thread.author}</Text>
                                        <Text note>11h ago</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                            </CardItem>
                            <CardItem content>
                                <Text>{thread.selftext}</Text>
                            </CardItem>
                            <CardItem>
                                <Button transparent>
                                    <Text>{thread.ups}</Text>
                                </Button>
                                <Button transparent>
                                    <Icon active name="arrow-up" />
                                </Button>
                                <Button transparent>
                                    <Icon active name="arrow-down" />
                                </Button>
                            </CardItem>
                        </Card>

                        <CommentList navigator={this.props.navigator} refreshing={this.state.refreshing} />
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        items: state.threads || [],
        threadDetails: state.threadDetails,
        hasErrored: state.threadListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        selectedThread: state.selectedThread,
        isLoading: state.commentListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentListReload: (subreddit) => dispatch(CommentListActions.commentListReload(subreddit)),
        //subredditChanged: (url) => dispatch(SubredditActions.subredditChanged(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
