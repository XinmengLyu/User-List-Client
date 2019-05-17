import axios from 'axios';

const getListRequest = () => (
    {
        type: "GET_LIST_REQUEST"
    }
);

const getListSuccss = (data) => (
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
        //console.log("second");
        dispatch(getListRequest());
        axios.get("http://localhost:8080/api/users")
            .then((res) => {
                const processedData = res.data.map((user, index) => {
                    return {
                        key: index,
                        ...user
                    }
                });
                dispatch(getListSuccss(processedData));
            })
            .catch((err) => {
                dispatch(getListFail(err));
            });
    };
}