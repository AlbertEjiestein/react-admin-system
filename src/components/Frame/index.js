import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar, Badge  } from 'antd';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  DashboardOutlined,
  UnorderedListOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './frame.less'
import logo from './logo.png'
import { DownOutlined } from '@ant-design/icons'

import { getNotificationList } from '../../actions/notifications'
import { logout } from '../../actions/user'

const { Header, Content, Sider } = Layout;
const icons = {
  'dashboard': DashboardOutlined,
  'unordered-list': UnorderedListOutlined,
  'setting': SettingOutlined
}

const mapStateToProps = (state) => {
  return {
    notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
    avatar: state.user.avatar,
    displayName: state.user.displayName
  }
}

@connect(mapStateToProps, { getNotificationList, logout })
@withRouter
class Frame extends Component {
  componentDidMount(){
    this.props.getNotificationList()
  }

  onDropdownMenuClick = ({key}) => {
    if(key === "/logout"){
      this.props.logout()
    }else{
      this.props.history.push(key)
    }
  }

  menu = () => (
    <Menu onClick={this.onDropdownMenuClick}>
      <Menu.Item
        key='/admin/notifications'
      >
        <Badge dot={this.props.notificationsCount}>
          通知中心
        </Badge>
      </Menu.Item>
      <Menu.Item
        key='/admin/profile'
      >
        个人设置
      </Menu.Item>
      <Menu.Item
        key='/logout'
      >
        退出登录
      </Menu.Item>
    </Menu>
  )

  onMenuClick = ({key}) => {
    this.props.history.push(key)
  }
  render() {
    const selectedKey = this.props.location.pathname.split('/')

    selectedKey.length = 3
    return (
      <Layout style={{minHeight: '100%'}}>
        <Header className="header qf-header">
          <div className="qf-logo">
            <img src={logo} alt='yaodage'/>
          </div>
          <div>
            <Dropdown overlay={this.menu} trigger={['hover']}>
              <div style={{display: 'flex', alignItems: 'center'}} onClick={e => e.preventDefault()}>
                <Avatar src={this.props.avatar} />
                <span>欢迎您！{this.props.displayName}</span>
                <Badge
                  count={this.props.notificationsCount}
                  offset={[-5,-5]}
                >
                  <DownOutlined />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey.join('/')]}
              onClick={this.onMenuClick}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                this.props.menu.map(route => {
                  const Icon = icons[route.icon];
                  return (
                    <Menu.Item
                      key={route.pathname}
                    >
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
                margin: 0,
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