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
    ScrollView,
    Easing
} from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import Interactable from 'react-native-interactable';
import { RowActions1, Row } from './RowActions1';
import CommentListEntry from './CommentListEntry';

const Screen = Dimensions.get('window');

class CommentList extends Component {
    constructor() {
        super();

    }

    componentDidMount() {
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
            <View>
                <ListView

                    dataSource={this.props.dataSource}
                    renderRow={(rowData, sectionID, rowID) => (
                        <CommentListEntry navigator={this.props.navigator} isLoading={this.props.refreshing} index={rowID} comment={rowData}></CommentListEntry>
                    )}
                />
            </View>
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
        commentListReload: (subreddit) => dispatch(CommentListActions.commentListReload(subreddit)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
