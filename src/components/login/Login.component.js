import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase';
// import ForgetPasswordModal from '../../Components/ForgetPasswordModal';
import { Card, Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.scss';

function Login(props) {

  const login = (values) => {
    firebase.auth().signInWithEmailAndPassword(values.username, values.password)
      .then(res => {
        props.history.push({
          pathname: '/',
          state: { ...props, ...res }
        });
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (props.uid) {
      props.history.push('/');
    }
  }, [props.uid]);

  return (
    <div className="Login ">
      <Card className="Login__Card" bordered={false} title="Login" >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={login}
        >
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: 'Please input your Username!',
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{
              required: true,
              message: 'Please input your Password!',
            }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">Forgot password</a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
          Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default withRouter(Login);