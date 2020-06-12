## react-admin-system项目（大个博客系统）

该项目主要侧重基于React框架完成前端功能，目前后端使用mock假数据来模拟，后期会使用nodejs+mysql来搭建服务。

该博客目前主要功能如下（后期可能会补充新功能）：

+ 登录与注册

+ 导航栏
  + 仪表盘
  + 文章管理
    + 博客编辑
    + 博客删除
  + 设置
+ 通知中心
+ 个人设置
  + 更换头像



### `一、使用react-rewired配置基本环境`

创建项目：

```js
npx create-react-app react-admin-system
```

安装`antd`

```js
cnpm i antd -S
```

要在`react`中使用`antd`，需安装`react-app-rewired和customize-cra`对 `create-react-app` 进行自定义配置

```js
// 安装
cnpm i react-app-rewired customize-cra -D

// 修改package.json
react-scripts 需改为react-app-rewired

// 在项目根目录新建config-overrides.js用于修改默认配置
```

antd 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，安装`babel-plugin-import`插件用于组件和样式文件按需加载，css或者less

对于less文件，需要安装less、less-loader转换成css文件， 使用`addLessLoader`进行配置

为了项目中支持装饰器模式（高阶组件），需安装`@babel/plugin-proposal-decorators`，并使用`addDecoratorsLegacy`配置

```js
cnpm install babel-plugin-import --save


// config-overrides.js中相关配置
const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
  // 使用less-loader将less转换为css
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  // 支持按需加载less或者css文件
  fixBabelImports('import',{
    "libraryName": "antd",
    "libraryDirectory": "es",
    "style": true,   
  }),
  addDecoratorsLegacy()
)

// 这样就可以实现按需加载了
import { Button } from 'antd';
而不是这样引入全部样式，影响性能
@import '~antd/dist/antd.css';
```



### `二、配置基本页面及路由配置`

数据流管理：

+ reducers

+ actions

+ store.js

组件：

+ components
+ views
  + Login
  + NotFound
  + Dashboard
  + ArticleList
  + ArticleEdit
  + Notification
  + Setting
  + Profile
  + NoAuth

路由：

+ routes
  + 外层路由 /login  /404  /admin
  + 内层路由 /admin/xxx
  + 路由懒加载

网络请求：

+ requests



**外层路由配置：**

```react
<Router>
    <Switch>
      <Route path="/admin" render={() => {
        return <App />
      }}></Route>
      {
        mainRoutes.map(route => {
          return <Route key={route.pathname} path={route.pathname} component={route.component}  />
        })
      }
      <Redirect from="/" to="/admin" exact />
      <Redirect to="/404" />
    </Switch>
</Router>
```

**内层路由配置：**

```react
<Switch>
    {
        adminRoutes.map(route => {
            return <Route key={route.pathname} path={route.pathname} component={route.component} />
        })
    }
    <Redirect from="/admin" to="/admin/dashboard" exact />
    <Redirect to="/404" />
</Switch>
```

**路由懒加载：**

可以使用`react-loadable`插件，安装：`cnpm i react-loadable -S`

也可以自定义一个loadable插件，路由懒加载，其原理是基于`webpack`的异步模块打包，`webpack`会对代码中异步引入的模块单独打包一份，直到真正调用的时候才去服务端拿。

下面是自定义的`Loadable`:

```react
import React, { Component } from "react"

const Loadable = ({
  loader,
  loading : Loading
}) => {
  return class LoadableComponent extends Component{
    constructor(props){
      super(props)
      this.state = {
        LoadedComponent: null
      }
    }
    componentDidMount(){
      loader()
        .then(resp => {
          this.setState({
            LoadedComponent: resp.default
          })
        })
    }
    render(){
      const LoadedComponent = this.state.LoadedComponent;
      return (
        LoadedComponent
        ?
        <LoadedComponent {...this.props}/>
        :
        <Loading />
      )
    }
  }
}

export default Loadable
```



### `三、使用antd实现Frame组件`

```react
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
```





