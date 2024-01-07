import React from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const { Title } = Typography;

const UpdateUser = () => {
  const {id} = useParams();
    const navigate = useNavigate()
    const onFinish = (values) => {
        console.log(values);
        axios.put(`http://localhost:8000/user/${id}`, {
            username: values.username,
            password: values.password
        })
        .then((data) => {
            alert("Updated successfully")
            navigate("/admin/user")
        })
        .catch((err) => console.log(err))
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
          <Title level={2}>UPDATE</Title>
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
              UPDATE
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateUser;

