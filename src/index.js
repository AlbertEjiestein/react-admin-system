import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import App from './App'
import { mainRoutes } from './routes'

render(
  <Router>
    <Switch>
      <Route path="/admin" render={() => {
        // 后边需要设置登录验证，登录之后才可访问
        return <App />
      }} />
      {
        mainRoutes.map(route => {
          return <Route key={route.pathname} path={route.pathname} component={route.component}  />
        })
      }
      <Redirect from="/" to="/admin" exact />
      <Redirect to="/404" />
    </Switch>
  </Router>,
  document.getElementById('root')
)