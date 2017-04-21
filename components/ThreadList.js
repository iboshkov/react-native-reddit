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
    ActivityIndicator
} from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import Interactable from 'react-native-interactable';

class ThreadList extends Component {
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
        });
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
            <Interactable.View
                horizontalOnly={true}
                snapPoints={[{ x: 0 }, { x: -200 }]}
                onSnap={this.onDrawerSnap}>

                <Card>
                    <CardItem header>
                        <Text>
                            header
                            </Text>
                    </CardItem>

                    <CardItem>
                        <Body>

                            <Text>
                                Data
                                </Text>

                        </Body>
                    </CardItem>
                    <CardItem header>
                        <Text>
                            Footer
                            </Text>
                    </CardItem>
                </Card>
            </Interactable.View>
        )

        return (
            <View
                style={this.style.thread_view_background}
            >
                {this.props.isLoading ? (
                    <ActivityIndicator
                        animating={true}
                        style={[this.style.centering, { height: 80 }]}
                        size="large"
                    />
                ) : (
                        <ListView
                            dataSource={this.props.dataSource}
                            renderRow={(rowData) => (
                                <Interactable.View
                                    horizontalOnly={true}
                                    snapPoints={[{ x: 0 }, { x: -200 }]}
                                    onSnap={this.onDrawerSnap}>

                                    <Card>
                                        <CardItem header>
                                            <Text
                                                style={this.style.thread_entry_header}>
                                                Posted by: <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.author}</Text> in <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.subreddit_name_prefixed}</Text>
                                            </Text>
                                        </CardItem>

                                        <CardItem>
                                            <Body>

                                                <Text
                                                    style={this.style.thread_entry_title}>
                                                    {rowData.title}
                                                </Text>

                                            </Body>
                                        </CardItem>
                                        <CardItem header>
                                            <Text
                                                style={this.style.thread_entry_meta}>
                                                {rowData.num_comments} comments
                                    </Text>
                                        </CardItem>
                                    </Card>
                                </Interactable.View>
                            )}
                        />
                    )}
            </View>
        );
        return (
            <View
                style={this.style.thread_view_background}
            >
                {this.props.isLoading && (
                    <ActivityIndicator
                        animating={true}
                        style={[this.style.centering, { height: 80 }]}
                        size="large"
                    />
                )}
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) => (
                        <View
                            style={this.style.thread_entry}>
                            <Text
                                style={this.style.thread_entry_header}>
                                Posted by: <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.author}</Text> in <Text style={{ color: 'red', fontWeight: 'bold' }}>{rowData.domain}</Text>
                            </Text>
                            <Text
                                style={this.style.thread_entry_title}>
                                {rowData.title}
                            </Text>
                            <Text
                                style={this.style.thread_entry_meta}>
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
