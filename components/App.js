import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from './ThreadList'
import SubredditList from './SubredditList'
import * as ThreadListActions from '../actions/thread_list';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    Picker,
    ToastAndroid,
    ActivityIndicator
} from 'react-native';
const SideMenu = require('react-native-side-menu');
const menu = (
    <SubredditList />
);
class App extends Component {
    constructor() {
        super();
    }



    componentDidMount() {
        console.log("App", this.props.selectedSubreddit);
    }

    componentWillReceiveProps(newProps) {
        console.log("App PROPS: ", this.props, newProps);
        
        if (this.props.selectedSubreddit !== newProps.selectedSubreddit) {
            this._side_menu.setState({isOpen: false});
        }
    }


    render() {


        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#3F3E4E',
            }}>
                <SideMenu
                 ref={(ref) => {this._side_menu = ref}}
                 menu={menu}>
                    <ThreadList />
                </SideMenu>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("STATE", state);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    return {
        items: state.threads || [],
        dataSource: ds.cloneWithRows(state.threads || []),
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
