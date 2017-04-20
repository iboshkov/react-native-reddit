import axios from 'axios';
import { threadListReload } from './thread_list';

export function subredditListHasErrored(bool) {
    return {
        type: 'SUBREDDIT_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function subredditListIsLoading(bool) {
    return {
        type: 'SUBREDDIT_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function subreddits(subreddits) {
    return {
        type: 'SUBREDDIT_LIST_LOADED',
        subreddits
    };
}

export function subredditChangedAction(subreddit) {
    return {
        type: 'SUBREDDIT_LIST_SELECTED',
        subreddit
    };
}

export function subredditChanged(subreddit) {
    return (dispatch) => {
        dispatch(subredditChangedAction(subreddit));
        console.log("Function: ", threadListReload)
        let thread_action = threadListReload(subreddit);
        console.log("Dispatch reload", subreddit, thread_action);
        dispatch(thread_action);
    };
}

export function subredditListFetchData(url) {
    return (dispatch) => {
        dispatch(subredditListIsLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(subredditListIsLoading(false));
                return response;
            })
            .then((response) => response.data.data.children.map(obj => obj.data))
            .then((transformed) => dispatch(subreddits(transformed)))
            .catch((ex) => {
                console.error("Exception fetching subreddits", ex);
                dispatch(subredditListHasErrored(true));
            });
    };
}