import Loadable from 'react-loadable'
import {Loading} from '../components'

const Login = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
})
const DashBoard = Loadable({
  loader: () => import('./DashBoard'),
  loading: Loading
})
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading
})
const ArticleEdit = Loadable({
  loader: () => import('./Article/edit'),
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
const Profile = Loadable({
  loader: () => import('./Profile'),
  loading: Loading
})
const NoAuth = Loadable({
  loader: () => import('./NoAuth'),
  loading: Loading
})

export {
  Login,
  NotFound,
  DashBoard,
  ArticleList,
  ArticleEdit,
  Setting,
  Notification,
  Profile,
  NoAuth
}