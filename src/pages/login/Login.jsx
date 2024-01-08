import React, { useEffect } from "react";
import { Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const Login = () => {
  const token = Cookies.get("Authorization");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/admin/home-page", { replace: true });
    } else {
      navigate("/admin/", { replace: true });
    }
  }, [navigate, token]);

  const onFinish = (values) => {
    console.log(values);
    axios
      .post("http://localhost:8000/auth/login", {
        username: values.username,
        password: values.password,
      })
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          const token = data.data.token;
          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
          Cookies.set("Authorization", token, {
            expires,
            sameSite: "strict",
            secure: true,
          });
          Swal({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = "/admin/home-page";
          }, 2000);
        }
      })
      .catch((err) => alert("Wrong login name or password"));
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
          <Title level={2}>LOGIN ADMIN</Title>
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
