import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { adminRoutes } from './routes'
import { Frame } from './components'

const menu = adminRoutes.filter(route => route.isNav === true);

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    role: state.user.role
  }
}

@connect(mapStateToProps)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <Frame menu={menu}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route
                  key={route.pathname}
                  exact={route.exact} 
                  path={route.pathname}
                  render={(routerProps) => {
                    const hasPromission = route.roles.includes(this.props.role)
                    return hasPromission ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth" />
                  }}
                />
              )
            })
          }
          <Redirect to={adminRoutes[0].pathname} from="/admin" exact/>
          <Redirect to="/404" />
        </Switch>
      </Frame>
      :
      <Redirect to="/login" />
    )
  }
}

export default App
