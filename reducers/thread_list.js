
export function threadListHasErrored(state = false, action) {
    switch (action.type) {
        case 'THREAD_LIST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function threadListIsLoading(state = false, action) {
    switch (action.type) {
        case 'THREAD_LIST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function threads(state = [], action) {
    switch (action.type) {
        case 'THREAD_LIST_LOADED':
            {
                console.log(action)
                return action.threads;
            }

        default:
            return state;
    }
}


export function selectedThread(state = null, action) {
    switch (action.type) {
        case 'THREAD_LIST_SELECTED':
            return action.thread;

        default:
            return state;
    }
}