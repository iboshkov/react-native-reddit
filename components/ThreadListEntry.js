import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ThreadListActions from '../actions/thread_list';
import {
    AppRegistry,
    StyleSheet,
    View,
    Button,
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
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import Interactable from 'react-native-interactable';
import { RowActions1, Row } from './RowActions1';
const Screen = Dimensions.get('window');

class ThreadListEntry extends Component {

    constructor() {
        super();

        this.style = StyleSheet.create({
            thread_entry: {
                color: '#CCCCCC',
                borderColor: '#F07B13',
                borderWidth: 0,
                borderBottomWidth: 1,
            },
            thread_view_background: {
                color: '#CCCCCC',
                borderColor: '#F07B13',
                borderWidth: 0,
                borderBottomWidth: 1,
            },
            thread_entry_title: {
                color: '#CCCCCC',
                paddingBottom: 30,
                fontWeight: 'bold'
            },
            thread_entry_header: {
                color: '#CCCCCC',
                paddingBottom: 5,
                fontWeight: 'bold'
            },
            thread_entry_meta: {
                color: '#CCCCCC',
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

    render() {
        let thread = this.props.thread;

        return (
            <Animated.View
                style={{
                    transform: [{
                        translateX: this.anim.interpolate(
                            {
                                inputRange: [-1, 1],
                                outputRange: [-Screen.width, Screen.width]
                            })
                    }]
                }}
            >
                <Row damping={this.state.damping} tension={this.state.tension}>
                    <Card>
                        <CardItem header>
                            <Text
                                style={this.style.thread_entry_header} onPress={() => {
                                    {/*Animated.spring(this.delta(rowData.id), {
                                                    toValue: 1.5,   // Returns to the start
                                                    velocity: 1,  // Velocity makes it move
                                                    tension: -10, // Slow
                                                    friction: 1,  // Oscillate a lot
                                                }).start();*/}

                                }}>
                                {this.props.isLoading ? 'true' : 'false'} Posted by: <Text style={{ color: 'red', fontWeight: 'bold' }}>{thread.author}</Text> in <Text style={{ color: 'red', fontWeight: 'bold' }}>{thread.subreddit_name_prefixed}</Text>
                            </Text>
                        </CardItem>

                        <CardItem>
                            <Body>

                                <Text
                                    style={this.style.thread_entry_title}>
                                    {thread.title}
                                </Text>

                            </Body>
                        </CardItem>
                        <CardItem header>
                            <Text
                                style={this.style.thread_entry_meta}>
                                {thread.num_comments} comments
                                    </Text>
                        </CardItem>
                    </Card>
                </Row>
            </Animated.View>
        );
    }
}

export default ThreadListEntry;
