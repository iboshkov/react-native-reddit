import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Easing, TouchableOpacity, Slider, Dimensions } from 'react-native';
import Interactable from 'react-native-interactable';
import { Icon } from 'native-base';

const Screen = Dimensions.get('window');

export class RowActions1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            damping: 1 - 0.6,
            tension: 300
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <Row damping={this.state.damping} tension={this.state.tension}>
                    <View style={styles.rowContent}>
                        <View style={styles.rowIcon} />
                        <View>
                            <Text style={styles.rowTitle}>Row Title</Text>
                            <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
                        </View>
                    </View>
                </Row>
                <Row damping={this.state.damping} tension={this.state.tension}>
                    <View style={styles.rowContent}>
                        <View style={styles.rowIcon} />
                        <View>
                            <Text style={styles.rowTitle}>Another Row</Text>
                            <Text style={styles.rowSubtitle}>You can drag this row too</Text>
                        </View>
                    </View>
                </Row>
                <Row damping={this.state.damping} tension={this.state.tension}>
                    <View style={styles.rowContent}>
                        <View style={styles.rowIcon} />
                        <View>
                            <Text style={styles.rowTitle}>And A Third</Text>
                            <Text style={styles.rowSubtitle}>This row can also be swiped</Text>
                        </View>
                    </View>
                </Row>

                <View style={styles.playground}>
                    <Text style={styles.playgroundLabel}>Change spring damping:</Text>
                    <Slider
                        key='damping'
                        style={styles.slider}
                        value={this.state.damping}
                        minimumValue={0.1}
                        maximumValue={0.6}
                        minimumTrackTintColor={'#007AFF'}
                        maximumTrackTintColor={'white'}
                        thumbTintColor={'white'}
                        onSlidingComplete={(value) => this.setState({ damping: value })}
                    />
                    <Text style={styles.playgroundLabel}>Change spring tension:</Text>
                    <Slider
                        key='tension'
                        style={styles.slider}
                        value={this.state.tension}
                        minimumValue={0.0}
                        maximumValue={1000.0}
                        minimumTrackTintColor={'#007AFF'}
                        maximumTrackTintColor={'white'}
                        thumbTintColor={'white'}
                        onSlidingComplete={(value) => this.setState({ tension: value })}
                    />
                </View>

            </View>
        );
    }
}

export class Row extends Component {
    constructor(props) {
        super(props);
        this._deltaX = new Animated.Value(0);
    }
    render() {
        return (
            <View>
                <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this, 'trash')}>
                        <Animated.View style={
                            [styles.buttonRight, {
                                opacity: this._deltaX.interpolate({
                                    inputRange: [-155, -115],
                                    outputRange: [1, 0],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                }),
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [-155, -115],
                                        outputRange: [1, 0.7],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]
                            }
                            ]} >
                            <Icon style={{ fontSize: 40, color: 'black' }} name='home' />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this, 'snooze')}>
                        <Animated.View source={require('../img/icon-clock.png')} style={
                            [styles.buttonRight, {
                                opacity: this._deltaX.interpolate({
                                    inputRange: [-90, -50],
                                    outputRange: [1, 0],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                }),
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [-90, -50],
                                        outputRange: [1, 0.7],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]
                            }
                            ]}>
                            <Icon style={{ fontSize: 40, color: 'black' }} name='home' />
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                <View style={{ position: 'absolute', left: 0, top: 0, bottom: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this, 'upvote')}>
                        <Animated.View style={
                            [styles.buttonLeft, {
                                opacity: this._deltaX.interpolate({
                                    inputRange: [50, 90],
                                    outputRange: [0, 1],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                }),
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [50, 90],
                                        outputRange: [0.7, 1],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]
                            }
                            ]} >
                            <Icon style={{ fontSize: 40, color: 'black' }} name='arrow-up' />
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.onButtonPress.bind(this, 'downvote')}>
                        <Animated.View style={
                            [styles.buttonLeft, {
                                opacity: this._deltaX.interpolate({
                                    inputRange: [90, 155],
                                    outputRange: [0, 1],
                                    extrapolateLeft: 'clamp',
                                    extrapolateRight: 'clamp'
                                }),
                                transform: [{
                                    scale: this._deltaX.interpolate({
                                        inputRange: [90, 155],
                                        outputRange: [0.7, 1],
                                        extrapolateLeft: 'clamp',
                                        extrapolateRight: 'clamp'
                                    })
                                }]
                            }
                            ]} >
                            <Icon style={{ fontSize: 40, color: 'black' }} name='arrow-down' />
                        </Animated.View>
                    </TouchableOpacity>
                </View>

                <Interactable.View
                    horizontalOnly={true}
                    snapPoints={[
                        { x: 155, damping: 1 - this.props.damping, tension: this.props.tension },
                        { x: 0, damping: 1 - this.props.damping, tension: this.props.tension },
                        { x: -155, damping: 1 - this.props.damping, tension: this.props.tension }
                    ]}
                    dragToss={0.01}
                    animatedValueX={this._deltaX}>
                    <View>
                        {this.props.children}
                    </View>
                </Interactable.View>
            </View >
        );
    }
    onButtonPress(name) {
        alert(`Button ${name} pressed`);
    }
}

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
