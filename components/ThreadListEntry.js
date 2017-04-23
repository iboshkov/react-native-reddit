import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ThreadListActions from '../actions/thread_list';
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Picker,
    ToastAndroid,
    RefreshControl,
    Dimensions,
    ActivityIndicator,
    Animated,
    ScrollView,
    Easing
} from 'react-native';
import { Container, Content, Card, Left, Icon, Button, Thumbnail, CardItem, Text, Body } from 'native-base';
import Interactable from 'react-native-interactable';
import { RowActions1, Row } from './RowActions1';
const Screen = Dimensions.get('window');
import { AllHtmlEntities } from 'html-entities';

const entities = new AllHtmlEntities();

class ThreadListEntry extends Component {

    constructor() {
        super();

        this.style = StyleSheet.create({
            thread_entry: {
                borderColor: '#F07B13',
                borderWidth: 0,
                borderBottomWidth: 1,
            },
            thread_view_background: {
                borderColor: '#F07B13',
                borderWidth: 0,
                borderBottomWidth: 1,
            },
            thread_entry_title: {
                paddingBottom: 30,
                fontWeight: 'bold'
            },
            thread_entry_header: {
                paddingBottom: 5,
                fontWeight: 'bold'
            },
            thread_entry_meta: {
            },
            centering: {
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
            },
            animated_card: {
                left: -Screen.width,
                position: 'absolute'
            }
        });
        this.anim = new Animated.Value(-1);

        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            animating: false,
        };
    }

    componentDidMount() {
        this.startInAnim();
    }

    startInAnim(callback) {
        let anim = Animated.timing(       // Uses easing functions
            this.anim, // The value to drive
            {
                toValue: 0,        // Target
                duration: 200,    // Configuration
                useNativeDriver: true, // <-- Add this            
            },
        );
        let delay = Animated.delay(100 * this.props.index);
        Animated.sequence([delay, anim]).start(callback);
    }

    startOutAnim(callback) {
        let anim = Animated.timing(       // Uses easing functions
            this.anim, // The value to drive
            {
                toValue: 1,        // Target
                duration: 200,    // Configuration
                useNativeDriver: true, // <-- Add this            
            },
        );
        let delay = Animated.delay(100 * this.props.index);
        Animated.sequence([delay, anim]).start(callback);
    }

    componentWillReceiveProps(props) {

        if (!this.props.isLoading && props.isLoading) {
            if (!this.state.animating) {
                this.setState({ animating: true });
                this.startOutAnim(() => this.setState({ animating: false }));
            }
        }

        if (this.props.isLoading && !props.isLoading) {
            this.anim = new Animated.Value(-1);
            this.startInAnim();
        }

    }

    goToComments(url) {
        if (this.props.selectedThread != this.props.thread.permalink) {
            this.props.threadSelected(this.props.thread);
        }

        // this.props.navigator.push({
        //     screen: 'CommentsScreen',
        //     passProps: { thread: this.props.thread },
        // });
        this.props.navigator.switchToTab({
            tabIndex: 1 // (optional) if missing, this screen's tab will become selected
        });
    }

    render() {
        let thread = this.props.thread;

        let preview = null;

        if (thread.preview) {
            preview = entities.decode(thread.preview.images[0].source.url);
        }

        return (
            <Animated.View
                style={[{}, {
                    transform: [{
                        translateX: this.anim.interpolate(
                            {
                                inputRange: [-1, 1],
                                outputRange: [-Screen.width, Screen.width]
                            })
                    }]
                }]}
            >
                <Row damping={this.state.damping} tension={this.state.tension}>
                    <Card>
                        <CardItem>
                            <Left>
                                {preview && (
                                    <Thumbnail source={{ 'uri': preview }} />
                                )}
                                <Body>
                                    <Text><Text style={{ fontWeight: 'bold' }}>{thread.score.toString()}</Text> {thread.title}</Text>
                                    <Text note>by: /u/{thread.author}</Text>
                                    <Text note>in <Text style={{ fontWeight: 'bold' }}>/{thread.subreddit_name_prefixed}</Text></Text>
                                    <Text note>11h ago</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem button onPress={() => this.goToComments(thread.permalink)}>
                            <Button transparent>
                                <Icon active name="arrow-up" />
                                <Text>{thread.ups.toString()}</Text>
                            </Button>
                            <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>{thread.num_comments.toString()}</Text>
                            </Button>
                        </CardItem>
                    </Card>
                </Row>
            </Animated.View>
        );
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
        threadSelected: (thread) => dispatch(ThreadListActions.threadSelected(thread))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreadListEntry);
