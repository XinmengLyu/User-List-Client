import axios from 'axios';

//action on list reducer
const getListRequest = () => (
    {
        type: "GET_LIST_REQUEST"
    }
);

const getListSuccess = (data) => (
    {
        type: "GET_LIST_SUCCESS",
        data: data
    }
);

const getListFail = (err) => (
    {
        type: "GET_LIST_FAIL",
        err: err
    }
);

const updateListRequest = () => (
    {
        type: "UPDATE_LIST_REQUEST"
    }
);

const updateListSuccess = () => (
    {
        type: "UPDATE_LIST_SUCCESS"
    }
);

const updateListFail = (err) => (
    {
        type: "UPDATE_LIST_FAIL",
        err: err
    }
)

const updateListWarning = (warning) => (
    {
        type: "UPDATE_LIST_WARNING",
        warning: warning
    }
)

const decorateData = (data) => {
    return data.map((user, index) => {
        return {
            key: index,
            ...user
        }
    });
};

export const getList = () => {
    return (dispatch) => {
        dispatch(getListRequest());
        axios.get("http://localhost:8080/api/users")
            .then((res) => {
                const decoratedData = decorateData(res.data)
                dispatch(getListSuccess(decoratedData));
            })
            .catch((err) => {
                dispatch(getListFail(err));
            });
    };
};

export const deleteUser = (id, history) => {
    return (dispatch) => {
        dispatch(getListRequest());
        axios.delete(`http://localhost:8080/api/users/${id}`)
            .then(res => axios.get("http://localhost:8080/api/users"))
            .then(res => {
                //console.log(res);
                const decoratedData = decorateData(res.data)
                dispatch(getListSuccess(decoratedData));
            })
            .catch(err => {
                //console.log(err);
                dispatch(getListFail(err));
                setTimeout(() => history.push("/"), 5000);
            });
    }
};

export const addUser = (user, history) => {
    return (dispatch) => {
        dispatch(updateListRequest());
        axios.post("http://localhost:8080/api/users", { ...user })
            .then(res => {
                dispatch(updateListSuccess());
                history.push('/');
            })
            .catch(err => {
                //console.log(err);
                dispatch(updateListFail(err));
                setTimeout(() => history.push("/add"), 5000);
            });
    }
};

export const updateUser = (id, user, history) => {
    return (dispatch) => {
        console.log("axios");
        dispatch(updateListRequest());
        axios.put(`http://localhost:8080/api/users/${id}`, { ...user })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    dispatch(updateListSuccess());
                    history.push("/");
                } else {
                    dispatch(updateListWarning(res.data));
                }
            })
            .catch(err => {
                //console.log(err);
                dispatch(updateListFail(err));
                setTimeout(() => history.push(`/edit/${id}`), 5000);
            });
    }
}

//actions on detail reducer
const getDetailRequest = () => (
    {
        type: "GET_DETAIL_REQUEST"
    }
);

const getDetailSuccess = data => (
    {
        type: "GET_DETAIL_SUCCESS",
        data: data
    }
);

const getDetailFail = err => (
    {
        type: "GET_DETAIL_FAIL",
        err: err
    }
);

export const getDetail = (id) => {
    return (dispatch) => {
        dispatch(getDetailRequest());
        axios.get(`http://localhost:8080/api/users/${id}`)
            .then((res) => {
                dispatch(getDetailSuccess(res.data));
            })
            .catch((err) => {
                dispatch(getDetailFail(err));
            });
    };
};