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
import ThreadListEntry from './ThreadListEntry';

const Screen = Dimensions.get('window');

class CommentList extends Component {
    constructor() {
        super();

        this.deltaXMap = {};

        this._deltaX = new Animated.Value(0);

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
        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            animating: false,
        };
    }

    componentDidMount() {
        console.log("Path", this.props.selectedSubreddit);
        this.props.threadListReload(this.props.selectedSubreddit);
    }

    componentWillReceiveProps(props) {

    }

    onDrawerSnap() {
        console.log("Snap");
    }
    runInAnims() {
    }
    render() {
        if (this.props.hasErrored) {
            return <Text>Sorry! There was an error loading the subreddits</Text>;
        }

        let anims = this.props.items.map((item, idx) => new Animated.Value(0));

        return (
            <View
                style={this.style.thread_view_background}
            >

                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={(rowData, sectionID, rowID) => (
                        <ThreadListEntry isLoading={this.props.refreshing} index={rowID} thread={rowData}></ThreadListEntry>
                    )}
                />
            </View >
        );
    }
}

const mapStateToProps = (state) => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
        items: state.comments || [],
        dataSource: ds.cloneWithRows(state.comments || []),
        hasErrored: state.commentListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        selectedThread: state.selectedThread,
        isLoading: state.commentListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        commentListReload: (subreddit) => dispatch(ThreadListActions.threadListReload(subreddit)),
        //subredditChanged: (url) => dispatch(SubredditActions.subredditChanged(url))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
