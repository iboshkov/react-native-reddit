import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as CommentListActions from '../actions/comment_list';
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
    TouchableOpacity,
    WebView,
    ScrollView,
    Easing
} from 'react-native';
import { Container, Content, Card, CardItem, Text, Body, List, ListItem, Thumbnail } from 'native-base';
import Interactable from 'react-native-interactable';
import { RowActions1, Row } from './RowActions1';
const Screen = Dimensions.get('window');
const colorDepth = ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51', '#54457F', '#AC7B84', '#4C243B', '#F5A6E6'];
class CommentListEntry extends Component {

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
        this.anim = new Animated.Value(0);
        this.collapseAnim = new Animated.Value(1);

        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            animating: false,
            collapsed: false,
            maxHeight: 0
        };
    }

    componentDidMount() {
        //this.startInAnim();
    }

    startInAnim(callback) {
        let anim = Animated.timing(       // Uses easing functions
            this.anim, // The value to drive
            {
                toValue: 0,        // Target
                duration: 200,    // Configuration,
                useNativeDriver: true,
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
                useNativeDriver: true,
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

    collapse() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        let raw = this.props.comment;
        let comment = raw.data;

        let children = [];
        if (comment.replies && comment.replies !== '') {
            children = comment.replies.data.children;
        }

        const levelStyle = {
            marginLeft: 20 * comment.depth,
            borderLeftWidth: 3,
            borderLeftColor: colorDepth[comment.depth]
        };

        if (raw.kind === 'more') {
            return (
                <Text style={levelStyle}>Read {comment.count} more comments</Text>
            );
        }

        return (
            <TouchableOpacity >

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
                        <ListItem onPress={() => this.collapse()} style={levelStyle}>
                            <Body >
                                <Text>
                                    {this.state.collapsed && '[collapsed]'} <Text style={{ color: 'red', fontWeight: 'bold' }}>{comment.author}</Text> <Text style={{ fontWeight: 'bold' }}>{comment.ups.toString()} points</Text>
                                </Text>
                                {!this.state.collapsed && (
                                    <Text
                                        onPress={() => this.collapse()}
                                        style={{
                                            padding: 10
                                        }}
                                        note>
                                        {comment.body}
                                    </Text>)}
                            </Body>

                        </ListItem>
                    </Row>
                </Animated.View>
                <View>

                    {!this.state.collapsed && children.map((child, index) => (
                        <CommentListEntry navigator={this.props.navigator} isLoading={this.props.isLoading} index={index} comment={child}></CommentListEntry>
                    ))}
                </View>

            </TouchableOpacity>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListEntry);
