import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
const onFinish = (values) => {
    axios.post("http://localhost:8000/user/", {
        username: values.username,
        password: values.password
    })
.then((data) => {
    if(data.data.message === "success" ){
        alert("Sign Up Success")
        window.location.href = "/admin/user"
    }
})
.catch((err) => alert("registration failed"))
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Register = () => (
    <Form
        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="User Name"
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Name!',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);
export default Register;