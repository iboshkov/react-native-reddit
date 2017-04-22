import SubredditList from '../components/SubredditList';
import React, { Component, View } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import material from '../native-base-theme/variables/platform';
import { Container, Content, StyleProvider } from 'native-base';
import getTheme from '../native-base-theme/components';


export default class Sidebar extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <StyleProvider style={getTheme(material)}>
                <Container style={{
                    backgroundColor: '#FFF'
                }}>
                    <Content>

                        <SubredditList />
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}