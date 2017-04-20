
export function subredditListHasErrored(state = false, action) {
    switch (action.type) {
        case 'SUBREDDIT_LIST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function subredditListIsLoading(state = false, action) {
    switch (action.type) {
        case 'SUBREDDIT_LIST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function subreddits(state = [], action) {
    switch (action.type) {
        case 'SUBREDDIT_LIST_LOADED':
            {
                console.log(action)
                return action.subreddits;
            }

        default:
            return state;
    }
}


export function selectedSubreddit(state = null, action) {
    switch (action.type) {
        case 'SUBREDDIT_LIST_SELECTED':
            return action.subreddit;

        default:
            return state;
    }
}