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
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';

class SubredditList extends Component {
    componentDidMount() {
        this.props.fetchData('http://www.reddit.com/subreddits/default.json');
    }

    subredditSelected(url) {
        this.props.subredditChanged(url);
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
            <View>

                <FlatList
                    data={this.props.items}
                    renderItem={({ item }) => (
                        <Text style={styles.picker_item} key={item.id} onPress={() => this.subredditSelected(item.url)} title={item.display_name} value={item.url}>
                            {item.display_name}
                        </Text>
                    )}
                />
            </View>
        );
        
        return (
            <ScrollView
                ref={(ref) => this._drawer = ref}
                style={styles.picker}>
                {
                    this.props.items.map((item, idx) => (
                        <Button style={styles.picker_item} key={item.url} onPress={() => this.subredditSelected(item.url)} title={item.display_name} value={item.url}>
                            {item.display_name}
                        </Button>
                    ))
                }
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("STATE", state);
    let placeholder_post = {
        id: 0,
        url: null,
        display_name: '',
    };
    let placeholders = [];
    for (let i = 0; i < 10; i++) {
        placeholder_post.id = i;
        placeholders.push(placeholder_post);
    }
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
    picker: {
        color: '#CCCCCC',
        borderColor: '#F07B13',
        borderWidth: 0,
        borderBottomWidth: 1,
    },
    picker_item: {
        color: '#CCCCCC',
        marginBottom: 30
    }
});


export default connect(mapStateToProps, mapDispatchToProps)(SubredditList);
