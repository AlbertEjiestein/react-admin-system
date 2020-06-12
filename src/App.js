import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Frame } from './components'

import { adminRoutes } from './routes'

const menu = adminRoutes.filter(route => route.isNav === true);

export default class App extends Component {
  render() {
    return (
      <Frame menu={menu}>
        <Switch>
          {
            adminRoutes.map(route => {
              return <Route key={route.pathname} path={route.pathname} component={route.component} />
            })
          }
          <Redirect from="/admin" to="/admin/dashboard" exact />
          <Redirect to="/404" />
        </Switch>
      </Frame>
    )
  }
}