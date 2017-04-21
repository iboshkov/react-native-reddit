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
import Sidebar from './Sidebar';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import Interactable from 'react-native-interactable';
import { Card, CardItem } from 'native-base';
const Screen = Dimensions.get('window');

class App extends Component {
    constructor() {
        super();
        this._deltaX = new Animated.Value(0);
        this.state = {
            damping: 1 - 0.7,
            tension: 300,
            refreshing: false,
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
        this.drawer._root.close()
    };

    openDrawer = () => {
        this.drawer._root.open()
    };

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{
                    backgroundColor: '#FFF'
                }}>
                    <Header>
                        <Left>
                            <Button onPress={this.openDrawer} transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>React Reddit</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Drawer
                        ref={(ref) => { this.drawer = ref; }}
                        content={<Sidebar navigator={this.navigator} />}
                    >
                        <Content
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.isLoading}
                                    onRefresh={this._onRefresh.bind(this)}
                                />}
                        >

                            <ThreadList />
                        </Content>
                    </Drawer>
                    <Footer>
                        <FooterTab>
                            <Button>
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                        <FooterTab>
                            <Button>
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                        <FooterTab>
                            <Button >
                                <Text>Footer</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    card: {
        width: 300,
        height: 180,
        backgroundColor: 'red',
        borderRadius: 8,
        marginVertical: 6
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(App);
