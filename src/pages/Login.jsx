import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import  { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../css/Login.css';  

const Login= () => {
  const navigate = useNavigate();
  const onFinish = (values) => {  
      navigate('/user');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Form
          name="login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item name="username">
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="password">
            <Input.Password prefix={<LockOutlined/>} iconRender={() => null}/>
          </Form.Item>

          <Form.Item>
           <Checkbox className='checkbox'>Remember me</Checkbox>
          </Form.Item>

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
