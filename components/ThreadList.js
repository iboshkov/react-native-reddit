import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class ThreadList extends Component {
    constructor() {
        super();

        this.style = StyleSheet.create({
            thread_entry: {
                backgroundColor: '#3F3E4E',
                color: '#CCCCCC',
                borderColor: '#F07B13',
                borderWidth: 0,
                borderBottomWidth: 1,
                padding: 10
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
                paddingLeft: 15,
            },
            centering: {
                alignItems: 'center',
                justifyContent: 'center',
                padding: 8,
            },
            gray: {
                backgroundColor: '#cccccc',
            },
            horizontal: {
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 8,
            },
        });
    }



    componentDidMount() {
        console.log("Path", this.props.selectedSubreddit);
        this.props.threadListReload(this.props.selectedSubreddit);
    }

    componentWillReceiveProps(props) {
        console.log("PROPS: ", props);
    }


    render() {
        if (this.props.hasErrored) {
            return <Text>Sorry! There was an error loading the subreddits</Text>;
        }

        // if (this.props.isLoading) {
        //     return (
        //         <ActivityIndicator
        //             animating={true}
        //             style={[this.style.centering, { height: 80 }]}
        //             size="large"
        //         />
        //     );
        // }

        return (
            <View>
                {this.props.isLoading && (
                    <ActivityIndicator
                        animating={true}
                        style={[styles.centering, { height: 80 }]}
                        size="large"
                    />
                )}
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) => (
                        <View
                            style={this.style.thread_entry}>
                            <Text
                                style={this.style.thread_entry_header} Ï>
                                Posted by: <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.author}</Text> in <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.domain}</Text>
                            </Text>
                            <Text
                                style={this.style.thread_entry_title}>
                                {rowData.title}
                            </Text>
                            <Text
                                style={this.style.thread_entry_meta} Ï>
                                {console.log(rowData)}
                                {rowData.num_comments} comments
                        </Text>
                        </View>
                    )}
                />
            </View>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList);
