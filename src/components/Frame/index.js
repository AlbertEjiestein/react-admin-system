import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { withRouter } from 'react-router-dom'
import { 
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined
} from '@ant-design/icons'

import myblog from './myblog.png'
import './frame.less'

const { Header, Content, Sider } = Layout;
// sider导航栏的图标
const icons = {
  "dashboard": DashboardOutlined,
  "unordered-list": UnorderedListOutlined,
  "setting": SettingOutlined
}

@withRouter
class Frame extends Component {
  onMenuClick = ({key}) => {
    this.props.history.push(key)
  }
  render() {
    return (
      <Layout>
        <Header className="header dage-header">
          <div className="myblog">
            <img src={myblog} alt="大个博客系统" />
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menu.map(route => {
                  const Icon =icons[route.icon]
                  return (
                    <Menu.Item key={route.pathname}>
                      <Icon />
                      {route.title}
                    </Menu.Item>
                  )
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            <Content
              className="site-layout-background"
              style={{
                backgroundColor: '#fff',
                margin: 0
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Frame