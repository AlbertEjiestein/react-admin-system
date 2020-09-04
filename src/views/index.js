// import Loadable from 'react-loadable'
import Loadable from './loadable'

import { Loading } from '../components'

// import NotFound from './NotFound'
// import Login from './Login'
// import Dashboard from './Dashboard'
// import Article from './Article'
// import Setting from './Setting'

// 下面是路由懒加载，其原理是基于webpack的异步模块打包，webpack会对代码中异步引入的模块单独打包一份，直到真正调用的时候才去服务端拿
// 详细原理得看webpack源码
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading
})
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/Edit'),
  loading: Loading
})
const Setting = Loadable({
  loader: () => import('./Setting'),
  loading: Loading
})
const Notification = Loadable({
  loader: () => import('./Notification'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})


export {
  NotFound,
  Login,
  Dashboard,
  ArticleList,
  ArticleEdit,
  Setting,
  Notification,
  NoAuth,
  Profile
}
