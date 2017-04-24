import axios from 'axios';

export function commentListHasErrored(bool) {
    return {
        type: 'COMMENT_LIST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function commentListIsLoading(bool) {
    return {
        type: 'COMMENT_LIST_IS_LOADING',
        isLoading: bool
    };
}

export function comments(comments) {
    return {
        type: 'COMMENT_LIST_LOADED',
        comments
    };
}


export function threadDetails(thread) {
    return {
        type: 'SET_THREAD_DETAILS',
        thread
    };
}


export function commentChangedAction(comment) {
    return {
        type: 'COMMENT_LIST_SELECTED',
        comment
    };
}


export function commentListReload(thread) {
    return (dispatch) => {
        console.log("COMMENT LIST RELOAD", thread)
        let path = '';
        if (thread) {
            path = `${thread}`;
        }
        let url = `http://www.reddit.com${path}.json`;
        dispatch(commentListIsLoading(true));

        setTimeout(() =>
            dispatch(commentListFetchData(url)), 200);
    };
}

export function commentListFetchData(url) {
    return (dispatch) => {
        dispatch(commentListIsLoading(true));
        console.log("Comments fetch");
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response);
                }

                dispatch(commentListIsLoading(false));
                return response.json();
            })
            .then((response) => { 
                //console.log(response);
                console.log("That");
                dispatch(threadDetails(response[0]))
                return response[1].data.children
            })
            .then((transformed) => dispatch(comments(transformed)))
            .catch((ex) => {
                console.error("Exception fetching comments", ex);
                dispatch(commentListHasErrored(true));
            });
    };
}