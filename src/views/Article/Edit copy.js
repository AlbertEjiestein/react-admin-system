import React, { Component, createRef } from 'react'
import { Form, Input, Card, Button, DatePicker } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import moment from 'moment'
import E from 'wangeditor'

import './edit.less'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

const dateFormat = 'YYYY-MM-DD';

export default class Edit extends Component {
  constructor(){
    super()
    this.editorRef = createRef()
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
  }

  initEditor = () => {
    console.log(this.props)
    this.editor = new E(this.editorRef.current)
    // this.editor.customConfig.zIndex = 0
    this.editor.customConfig.onchange = function (html) {
      // html 即变化之后的内容
      console.log(html)
    }
    this.editor.create()
  }

  componentDidMount(){
    this.initEditor()
  }

  render() {
    return (
      <Card
        title="文章编辑" 
        extra={<Button>取消</Button>}
      >
        <Form
          onSubmitCapture={this.onSubmit}
          onFinish={this.onFinish}
          labelCol={formItemLayout.labelCol}
          wrapperCol={formItemLayout.wrapperCol}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '标题是必填的!',
              },
            ]}
            initialValue={"初始值"}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="标题" />
          </Form.Item>
          <Form.Item
            label="作者"
            name="author"
            rules={[
              {
                required: true,
                message: '作者是必填的!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="作者" />
          </Form.Item>
          <Form.Item
            label="阅读量"
            name="amount"
            rules={[
              {
                required: true,
                message: '阅读量是必填的!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="0" />
          </Form.Item>
          <Form.Item
            label="创建时间"
            name="createAt"
            rules={[
              {
                required: true,
                message: '创建时间是必填的!',
              },
            ]}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[
              {
                required: true,
                message: '内容是必填的!',
              },
            ]}
          >
            <div className='qf-editor' ref={this.editorRef} />
          </Form.Item>
          <Form.Item
            wrapperCol={{offset: 4}}
          >
            <Button type="primary" htmlType="submit" className="login-form-button">
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}
