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

export const getList = () => {
    return (dispatch) => {
        dispatch(getListRequest());
        axios.get("http://localhost:8080/api/users")
            .then((res) => {
                const decoratedData = res.data.map((user, index) => {
                    return {
                        key: index,
                        ...user
                    }
                })
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
            const decoratedData = res.data.map((user, index) => {
                return {
                    key: index,
                    ...user
                }
            })
            dispatch(getListSuccess(decoratedData));
        })
        .catch(err => {
            dispatch(getListFail(err));
            setTimeout(() => history.push("/"), 5000);
        });
    }
};

export const addUser = () => {};

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