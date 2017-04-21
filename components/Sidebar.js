import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from './ThreadList'
import SubredditList from './SubredditList'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    Picker,
    ToastAndroid,
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';


class Sidebar extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props);

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#FFF',
            }}>
                <SubredditList />
            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        items: state.threads || [],
        hasErrored: state.threadListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        isLoading: state.threadListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        threadListReload: (subreddit) => dispatch(ThreadListActions.threadListReload(subreddit)),
        //subredditChanged: (url) => dispatch(SubredditActions.subredditChanged(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
