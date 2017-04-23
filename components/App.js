import React, { Component } from 'react';
import { connect } from 'react-redux';
import ThreadList from './ThreadList'
import SubredditList from './SubredditList'
import * as ThreadListActions from '../actions/thread_list';
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
    Slider

} from 'react-native';
import { Container, Header, StyleProvider, Text, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';

const SideMenu = require('react-native-side-menu');

import { Drawer } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import Interactable from 'react-native-interactable';
import { Card, CardItem } from 'native-base';
import { RowActions1, Row } from './RowActions1';

const Screen = Dimensions.get('window');

class App extends Component {
    constructor() {
        super();
        this._deltaX = new Animated.Value(0);
        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            refreshing: false,
            drawerOpen: false
        };
    }

    async componentWillMount() {

    }
    componentDidMount() {
        console.log("App", this.props.selectedSubreddit);
    }

    _onRefresh() {
        this.setState({ refreshing: true });
        this.props.threadListReload(this.props.selectedSubreddit);
    }
    componentWillReceiveProps(newProps) {
        this.setState({ refreshing: newProps.isLoading })
        if (this.props.selectedSubreddit !== newProps.selectedSubreddit) {
            this.closeDrawer();
        }
    }

    closeDrawer = () => {
        //this.drawer._root.close()

    };

    openDrawer = () => {
        //  this.drawer._root.open();
    };

    toggleDrawer = () => {
        // this.drawer._root.toggle();
    };

    render() {
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
                        <ThreadList refreshing={this.state.refreshing} />
                    </Content>
                </Container>
            </StyleProvider>
        )
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    rowContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#eeeeee'
    },
    buttonIcon: {
        fontSize: 40
    },
    rowIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#73d4e3',
        margin: 20,
        fontSize: 40
    },
    rowTitle: {
        fontWeight: 'bold',
        fontSize: 20
    },
    rowSubtitle: {
        fontSize: 18,
        color: 'gray'
    },
    buttonRight: {
        width: 40,
        height: 40,
        marginRight: 25,
    },
    buttonLeft: {
        width: 40,
        height: 40,
        marginLeft: 25
    },
    playground: {
        marginTop: Screen.height <= 500 ? 0 : 80,
        padding: 20,
        width: Screen.width - 40,
        backgroundColor: '#5894f3',
        alignItems: 'stretch',
        alignSelf: 'center'
    },
    playgroundLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 15
    },
    slider: {
        height: 40
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
