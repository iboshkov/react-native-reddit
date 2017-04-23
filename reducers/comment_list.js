
export function commentListHasErrored(state = false, action) {
    switch (action.type) {
        case 'COMMENT_LIST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function commentListIsLoading(state = false, action) {
    switch (action.type) {
        case 'COMMENT_LIST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function comments(state = [], action) {
    switch (action.type) {
        case 'COMMENT_LIST_LOADED':
            {
                console.log(action)
                return action.comments;
            }

        default:
            return state;
    }
}

export function threadDetails(state = [], action) {
    switch (action.type) {
        case 'SET_THREAD_DETAILS':
            {
                console.log(action)
                return action.thread;
            }

        default:
            return state;
    }
}