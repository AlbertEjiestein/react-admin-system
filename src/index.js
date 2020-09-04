import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd'
import { mainRoutes } from './routes'
import App from './App'
import './index.less'

import store from './store'

render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router>
        <Switch>
          <Route path="/admin" component={App}/>
          {
            mainRoutes.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component} />
            })
          }
          <Redirect from="/" to="/admin" exact/>
          <Redirect to="/404" />
        </Switch>
      </Router>
    </ConfigProvider>
  </Provider>,
  document.getElementById('root')
)