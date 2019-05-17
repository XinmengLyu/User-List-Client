const initState = {
    data: [],
    isLoading: false,
    err: null
}

const reducer = (state = initState, action) => {
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
        default: {
            return state;
        }
    }
}

export default reducer;
