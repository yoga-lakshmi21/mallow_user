import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFail } from "../redux/login";
import "../css/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogin = (values) => {
    const validEmail = "eve.holt@reqres.in";
    const validPassword = "cityslicka";

    const { username, password, remember } = values;

    if (username === validEmail && password === validPassword) {
      const token = "fake-jwt-token";

      if (remember) {
        localStorage.setItem("token", token); 
      }

      dispatch(loginSuccess(token));
      navigate("/user"); 
    } else {
      dispatch(loginFail("Invalid email or password"));
    }
  };


  return (
    <div className="login-container">
      <div className="login-box">
        <Form
          name="login"
          layout="vertical"
          onFinish={handleLogin} 
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined />}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} iconRender={() => null} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox className="checkbox">Remember me</Checkbox>
          </Form.Item>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
