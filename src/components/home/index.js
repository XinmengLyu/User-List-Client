import React from 'react';
import { Input, Typography, Table, Button, Divider, message } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getList, deleteUser } from '../../redux/actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { filterInfo: "" };
    }

    componentDidMount() {
        const { getList } = this.props;
        getList();
    }

    handleChange = e => {
        this.setState({ filterInfo: e.target.value });
    }

    handleData = (filterInfo) => {
        let tmpUsers = [...this.props.users];

        //handle filter
        if (!!filterInfo) {
            filterInfo = filterInfo.toLowerCase();
            tmpUsers = tmpUsers.filter((user) => {
                return (user.first_name.toLowerCase().indexOf(filterInfo) !== -1) ||
                    (user.last_name.toLowerCase().indexOf(filterInfo) !== -1);
            });
        }

        return tmpUsers;
    }

    handleDelete = (record) => {
        const { history, deleteUser } = this.props;
        deleteUser(record._id, message, history);
    }

    handleClickAdd = () => {
        this.props.history.push("/add");
    };

    render() {
        const { isDataLoading, err, getList } = this.props;
        const { filterInfo } = this.state;
        //define columns for the table
        const columns = [
            {
                title: 'First Name',
                dataIndex: 'first_name',
                key: 'first_name',
                sorter: (a, b) => {
                    if (a.first_name < b.first_name) return -1;
                    else if (a.first_name > b.first_name) return 1;
                    return 0;
                },
            },
            {
                title: 'Last Name',
                dataIndex: 'last_name',
                key: 'last_name',
                sorter: (a, b) => {
                    if (a.last_name < b.last_name) return -1;
                    else if (a.last_name > b.last_name) return 1;
                    return 0;
                },
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: 'Gender',
                dataIndex: 'gender',
                key: 'gender',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <a href={`/edit/${record._id}`}>Edit</a>
                        <Divider type="vertical" />
                        <Button type="link" style={{ color: "red", paddingLeft: "0" }} onClick={() => this.handleDelete(record)} >Delete</Button>
                    </span>
                ),
            },
        ];

        if (err) {
            window.setTimeout(getList, 5000);
            return (<Typography.Title>There has been an error. This page will refresh shortly.</Typography.Title>);
        } else return (
            <div className="table-container">
                <Typography.Title>Users</Typography.Title>
                <Typography.Text>
                    Search:
                    <Input value={filterInfo} onChange={this.handleChange} style={{ width: "120px", margin: "10px 5px" }} />
                </Typography.Text>
                <Table
                    columns={columns}
                    dataSource={this.handleData(filterInfo)}
                    loading={isDataLoading}
                    footer={() => <Button type="primary" icon="form" onClick={this.handleClickAdd} >Create New User</Button>}
                />
            </div>
        );
    }
}

//connect redux to component
const mapStateToProps = state => (
    {
        users: state.list.data,
        isDataLoading: state.list.isLoading,
        err: state.list.err
    }
);

const mapDispatchToProps = dispatch => (
    {
        getList: () => {
            dispatch(getList());
        },
        deleteUser: (id, message, history) => {
            dispatch(deleteUser(id, message, history));
        }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
