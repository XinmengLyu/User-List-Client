const initState = {
    data: [],
    isLoading: false,
    warning: null,
    err: null
};

const list = (state = initState, action) => {
    switch (action.type) {
        case "GET_LIST_REQUEST": {
            return {
                ...state,
                isLoading: true
            }
        }
        case "GET_LIST_SUCCESS": {
            return {
                data: action.data,
                isLoading: false,
                warning: null,
                err: null
            }
        }
        case "GET_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
                warning: null,
                err: action.err
            }
        }
        case "UPDATE_LIST_REQUEST": {
            return {
                ...state,
                isLoading: true
            }
        }
        case "UPDATE_LIST_SUCCESS": {
            return {
                ...state,
                isLoading: false,
                warning: null,
                err: null
            }
        }
        case "UPDATE_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
                warning: null,
                err: action.err
            }
        }
        case "UPDATE_LIST_WARNING": {
            return {
                ...state,
                isLoading: false,
                warning: action.warning,
                err: null
            }
        }
        default: {
            return state;
        }
    }
}

export default list;
