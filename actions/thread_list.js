import axios from 'axios';

export function threadListHasErrored(bool) {
    return {
        type: 'THREAD_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function threadListIsLoading(bool) {
    return {
        type: 'THREAD_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function threads(threads) {
    return {
        type: 'THREAD_LIST_LOADED',
        threads
    };
}

export function threadChanged(threads) {
    return {
        type: 'THREAD_LIST_SELECTED',
        threads
    };
}

export function threadListReload(subreddit) {
    return (dispatch) => {
        console.log("THREAD LIST RELOAD", subreddit)
        let path = '';
        if (subreddit) {
            path = `${subreddit}`;
        }
        let url = `http://www.reddit.com/${path}.json`;
        dispatch(threadListFetchData(url));
    };
}

export function threadListFetchData(url) {
    return (dispatch) => {
        dispatch(threadListIsLoading(true));
        console.log(`Fetching threads from ${url}`)
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(threadListIsLoading(false));
                return response;
            })
            .then((response) => response.data.data.children.map(obj => obj.data))
            .then((transformed) => dispatch(threads(transformed)))
            .catch((ex) => {
                console.error("Exception fetching threads", ex);
                dispatch(threadListHasErrored(true));
            });
    };
}