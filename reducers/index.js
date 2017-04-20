import { combineReducers } from 'redux';
import {
    subredditListHasErrored,
    subredditListIsLoading,
    subreddits,
    selectedSubreddit
} from './subreddit_list';

import {
    threadListHasErrored,
    threadListIsLoading,
    threads,
    selectedThread
} from './thread_list';


export default combineReducers({
    subredditListHasErrored,
    subredditListIsLoading,
    subreddits,
    selectedSubreddit,


    threadListHasErrored,
    threadListIsLoading,
    threads,
    selectedThread
});