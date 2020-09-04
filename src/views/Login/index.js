import React, {Component} from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'

const mapStateToProps = state => {
  return {
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading,
    remember: state.user.remember
  }
}

@connect(mapStateToProps, {login})
class Login extends Component{
  onFinish = values => {
    this.props.login(values)
  }

  render(){
    return (
      this.props.isLogin
      ?
      <Redirect to="/admin" />
      :
      <Card
        title={'大个管理系统'}
        className="login-wrapper"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '输入用户名',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
              disabled={this.props.isLoading}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '输入密码',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
              disabled={this.props.isLoading}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox loading={this.props.isLoading}>记住我</Checkbox>
            </Form.Item>
          </Form.Item>
  
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isLoading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}

export default Login