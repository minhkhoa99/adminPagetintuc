import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import Cookies from "js-cookie"


const onFinish = (values) => {
    console.log('Success:', values);
    axios.post("http://localhost:8000/auth/login", {
        username: values.UserName,
        password: values.password
    })
    .then((data) => {
        if(data.data.status === 200){
            alert("Logged in successfully")
            const token = data.data.token;
            Cookies.set('Authorization', token, { sameSite: 'strict', secure: true });
            window.location.href = "/admin/home-page"
        }
    })
    .catch((err) => alert("Wrong login name or password"))
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const Login = () => (

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
            textAlign: "center",
            margin: "auto",
            marginTop: "10%"
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
            name="UserName"
            rules={[
                {
                    required: true,
                    message: 'Please input your User Name!',
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
export default Login;