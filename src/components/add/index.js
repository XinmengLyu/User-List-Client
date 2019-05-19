import React from 'react';
import { Typography, Form, Input, InputNumber, Select, Button } from 'antd';
import "antd/dist/antd.css";
import axios from 'axios';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = { confirmDirty: false, disabled: true, isLoading: false, err: null };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.setState({ isLoading: true });
                axios.post("http://localhost:8080/api/users", {
                    first_name: values.first_name,
                    last_name: values.last_name,
                    age: values.age,
                    gender: values.gender,
                    password: values.password
                })
                    .then(res => {
                        this.setState({ isLoading: false, err: null });
                        this.props.history.push("/");
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({ isLoading: false, err: err }, () => {
                            setTimeout(() => { this.props.history.push("/add"); }, 5000);
                        });
                    });
            }
        });
    };

    validateToNextPassword = (rules, value, callback) => {
        const { form } = this.props;
        const { confirmDirty } = this.state;
        if (value && confirmDirty) {
            //console.log("validate: " + value);
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rules, value, callback) => {
        //console.log("compare: " + value);
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback("Two passwords are inconsistant!");
        } else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        //console.log("onBlur() called");
        const { confirmDirty } = this.state;
        const { value } = e.target;
        this.setState({ confirmDirty: confirmDirty || !!value });
    };

    handleChange = (e, name) => {
        const { form } = this.props;
        form.setFieldsValue({ [name]: e.target.value });
        const values = form.getFieldsValue();
        // console.log("value: ");
        // console.log(Object.values(values));
        const empty = Object.values(values).reduce((acc, cur) => (acc || !cur), false);
        const matched = values.password === values.confirm;
        console.log(empty + " " + !matched);
        this.setState({ disabled: empty || !matched });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { err, disabled, isLoading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 6,
                },
            },
        };
        if (err) return (<Typography.Title>There has been an error. Please try again later.</Typography.Title>);
        else return (
            <div className="form-container">
                <Typography.Title>Create New User</Typography.Title>
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="First Name">
                        {getFieldDecorator("first_name", {
                            rules: [{ required: true, message: "Please input first name!" }]
                        })(
                            <Input placeholder="First Name" onChange={e => this.handleChange(e, "first_name")} />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator("last_name", {
                            rules: [{ required: true, message: "Please input last name!" }]
                        })(
                            <Input placeholder="Last Name" onChange={e => this.handleChange(e, "last_name")} />
                        )}
                    </Form.Item>
                    <Form.Item label="Age">
                        {getFieldDecorator("age", {
                            rules: [
                                {
                                    type: "number"
                                },
                                {
                                    required: true,
                                    message: "Input is not a number!"
                                }
                            ],
                            initialValue: 20
                        })(
                            <InputNumber min={0} />
                        )}
                    </Form.Item>
                    <Form.Item label="Gender">
                        {getFieldDecorator("gender", {
                            initialValue: "male",
                            rules: [{ required: true }]
                        })(
                            <Select>
                                <Select.Option value="male">male</Select.Option>
                                <Select.Option value="female">female</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Password">
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your password!"
                                },
                                {
                                    validator: this.validateToNextPassword
                                }
                            ]
                        })(
                            <Input.Password onChange={e => this.handleChange(e, "password")} />
                        )}
                    </Form.Item>
                    <Form.Item label="Comfirm Password">
                        {getFieldDecorator("confirm", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please confirm your password!"
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                    //message: "inconsistant!"
                                }
                            ]
                        })(
                            <Input.Password onBlur={this.handleConfirmBlur} onChange={e => this.handleChange(e, "confirm")} />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout} >
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon="download"
                            disabled={disabled}
                            loading={isLoading}
                        >
                            Add New User
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Add);
