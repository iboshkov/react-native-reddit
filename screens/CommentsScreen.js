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
    BackAndroid,
    Slider
} from 'react-native';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import CommentList from '../components/CommentList'
import * as CommentListActions from '../actions/comment_list';
import * as ThreadListActions from '../actions/thread_list';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, StyleProvider } from 'native-base';
import { AllHtmlEntities } from 'html-entities';

import FAIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const entities = new AllHtmlEntities();

class CommentsScreen extends BaseScreen {
    constructor(props) {
        super(props);
        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            refreshing: false,
            drawerOpen: false
        };

        this.isActiveScreen = false;

        BackAndroid.addEventListener('hardwareBackPress', () => {
            // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
            // Typically you would use the navigator here to go to the last state.
            if (!this.isActiveScreen) return false;
            this.goBack();
            return true;
        });
        this.icons = {};

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    goBack() {
        this.props.navigator.switchToTab({
            tabIndex: 0 // (optional) if missing, this screen's tab will become selected
        });
    }

    componentDidMount() {
        if (this.props.selectedThread && this.props.comments.length == 0) {
            this.props.commentListReload(this.props.selectedThread.permalink);
        }

        FAIcon.getImageSource('list-alt', 20, 'white')
            .then(source => this.icons['subreddit_list'] = source)
            .then(() => MaterialIcon.getImageSource('arrow-up', 20, 'white'))
            .then(source => this.icons['upvote'] = source)
            .then(() => MaterialIcon.getImageSource('arrow-down', 20, 'white'))
            .then(source => this.icons['downvote'] = source)
            .then(() => MaterialIcon.getImageSource('arrow-left', 20, 'white'))
            .then(source => this.icons['back'] = source)
            .then(() => {
                this.props.navigator.setButtons({
                    leftButtons: [
                        { id: 'back', icon: this.icons['back'] },
                        { id: 'upvote', icon: this.icons['upvote'] },
                        { id: 'downvote', icon: this.icons['downvote'] }
                    ]
                });
            });
    }

    onNavigatorEvent(event) {
        switch (event.id) {
            case 'back':
                this.goBack();
                break;
            case 'willAppear': {
                if (this.props.selectedThread) {
                    this.props.commentListReload(this.props.selectedThread.permalink);
                }
            }
                break;
            case 'didAppear':
                this.isActiveScreen = true;
                break;
            case 'willDisappear':
                break;
            case 'didDisappear':
                this.isActiveScreen = false;
                break;
        }
    }


    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.commentListReload(this.props.selectedThread.permalink);
    }

    render() {
        let thread = this.props.selectedThread;
        if (!thread) {
            return (<Text>No thread</Text>)
        }

        let preview = entities.decode(thread.preview.images[0].source.url);


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
                                        <Thumbnail source={{ 'uri': preview }} />
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
                        {this.props.isLoading ? (<ActivityIndicator />) : (
                            <CommentList navigator={this.props.navigator} refreshing={this.state.refreshing} />
                        )}
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        comments: state.comments || [],
        items: state.threads || [],
        threadDetails: state.threadDetails,
        hasErrored: state.threadListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        selectedThread: state.selectedThread,
        isLoading: state.commentListIsLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentListReload: (subreddit) => dispatch(CommentListActions.commentListReload(subreddit)),
        threadSelected: (url) => dispatch(ThreadListActions.threadSelected(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsScreen);
