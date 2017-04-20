import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SubredditActions from '../actions/subreddit_list';
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

class SubredditList extends Component {
    componentDidMount() {
        this.props.fetchData('http://www.reddit.com/subreddits/default.json');
    }

    render() {
        if (this.props.hasErrored) {
            return <Text>Sorry! There was an error loading the subreddits</Text>;
        }

        if (this.props.isLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.centering, { height: 80 }]}
                    size="large"
                />
            );
        }

        return (
            <Picker
                mode="dropdown"
                style={{
                    color: '#CCCCCC',
                    borderColor: '#F07B13',
                    borderWidth: 0,
                    borderBottomWidth: 1,
                }}
                selectedValue={this.props.isLoading ? 'Loading...' : this.props.selectedSubreddit}
                onValueChange={this.props.subredditChanged}
            >
                {
                    this.props.items.map((item, idx) => (
                        <Picker.Item key={item.url} label={item.display_name} value={item.url}>
                        </Picker.Item>
                    ))
                }
            </Picker >
        );
    }
}

const mapStateToProps = (state) => {
    console.log("STATE", state);
    return {
        items: state.subreddits || [],
        hasErrored: state.subredditListHasErrored,
        selectedSubreddit: state.selectedSubreddit,
        isLoading: state.subredditListIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(SubredditActions.subredditListFetchData(url)),
        subredditChanged: (url) => dispatch(SubredditActions.subredditChanged(url))
    };
};

const styles = StyleSheet.create({
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


export default connect(mapStateToProps, mapDispatchToProps)(SubredditList);
