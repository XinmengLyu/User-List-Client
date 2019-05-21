const initState = {
    data: [],
    isLoading: false,
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
                err: null
            }
        }
        case "GET_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
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
                err: null
            }
        }
        case "UPDATE_LIST_FAIL": {
            return {
                ...state,
                isLoading: false,
                err: action.err
            }
        }
        default: {
            return state;
        }
    }
}

export default list;
