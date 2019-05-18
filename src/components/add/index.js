import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import "antd/dist/antd.css";
import { tsExternalModuleReference } from '@babel/types';

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = { comfirmDirty: false, disabled: true };
    }

    handleSubmit = () => { };

    validateToNextPassword = (rules, value, callback) => {
        const {form} = this.props;
        if(value){
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    compareToFirstPassword = (rules, value, callback) => {
        const {form} = this.props;
        if(value && value !== form.getFieldValue('password')){
            callback("Two passwords are inconsistant!");
        }else {
            callback();
        }
    };

    handleConfirmBlur = e => {
        console.log("onBlur() called");
        consolr.log(e.target.value);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="form-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="First Name">
                        {getFieldDecorator("first_name", {
                            rules: [{ required: true, message: "Please input first name!" }]
                        })(
                            <Input placeholder="First Name" />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator("last_name", {
                            rules: [{ required: true, message: "Please input last name!" }]
                        })(
                            <Input placeholder="Last Name" />
                        )}
                    </Form.Item>
                    <Form.Item label="Age">
                        {getFieldDecorator("age", {
                            initialValue: 0,
                            type: "number", required: true, message: "Input is not a number!"
                        })(
                            <InputNumber min={0} />
                        )}
                    </Form.Item>
                    <Form.Item label="Gender">
                        {getFieldDecorator("gender", {
                            initialValue: "male",
                        })(
                            <Select>
                                <Select.Option value="male">male</Select.Option>
                                <Select.Option value="female">female</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Password">
                        {getFieldDecorator("password", [
                            {
                                required: true,
                                message: "Please input your password!"
                            },
                            {
                                validator: this.validateToNextPassword
                            }
                        ])(
                            <Input.Password />
                        )}
                    </Form.Item>
                    <Form.Item label="Comfirm Password">
                        {getFieldDecorator("confirm", [
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ])(
                            <Input.Password onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Add New User</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Add);
