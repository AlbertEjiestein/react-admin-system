import React, { Component, createRef } from 'react'
import { Form, Input, Card, Button, DatePicker, message, Spin } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import moment from 'moment'
import E from 'wangeditor'

import { getArticleById, saveArticle } from '../../requests'

import './edit.less'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
}

export default class Edit extends Component {
  constructor(){
    super()
    this.editorRef = createRef()
    this.formRef = createRef()
    this.state = {
      isLoading: false
    }
  }

  onFinish = values => {
    console.log('Received values of form: ', values);
    const data = Object.assign({}, values, {
      createAt: values.createAt.valueOf()
    })
    // console.log(this.props)
    this.setState({
      isLoading: true
    })
    saveArticle(this.props.match.params.id, data)
      .then(resp => {
        message.success(resp.msg)
        this.props.history.push('/admin/article')
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  initEditor = () => {
    this.editor = new E(this.editorRef.current)
    // this.editor.customConfig.zIndex = 0
    this.editor.customConfig.onchange = (html) => {
      this.formRef.current.setFieldsValue({
        content: html
      })
    }
    this.editor.create()
  }

  componentDidMount(){
    this.initEditor()
    this.setState({
      isLoading: true
    })
    getArticleById(this.props.match.params.id)
      .then(resp => {
        const {id, content, ...data} = resp
        data.createAt = moment(data.createAt)
        this.formRef.current.setFieldsValue(data)
        this.editor.txt.html(content)
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    console.log(this.props)
    return (
      <Card
        title="文章编辑" 
        extra={<Button onClick={this.props.history.goBack}>取消</Button>}
      >
        <Spin
          spinning={this.state.isLoading}
        >
          <Form
            onSubmitCapture={this.onSubmit}
            onFinish={this.onFinish}
            labelCol={formItemLayout.labelCol}
            wrapperCol={formItemLayout.wrapperCol}
            ref={this.formRef}
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
              // initialValue={"初始值"}
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
        </Spin>
      </Card>
    )
  }
}
