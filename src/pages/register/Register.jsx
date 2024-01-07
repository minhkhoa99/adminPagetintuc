import React from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const { Title } = Typography;

const Register = () => {
  const onFinish = (values) => {
    console.log(values);
    axios.post("http://localhost:8000/user", {
         username: values.username,
         password: values.password
     })
     .then((data) => {
        console.log(data);
         if(data.data){
             window.location.href = "/admin/user"
         }
     })
     .catch((err) => alert("Wrong login name or password"))
  };


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>Register</Title>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              REGISTER
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;