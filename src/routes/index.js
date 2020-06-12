import {
  Login,
  NotFound,
  DashBoard,
  ArticleList,
  ArticleEdit,
  Setting,
  Notification,
  Profile,
  NoAuth
} from '../views'

export const mainRoutes = [{
  pathname: '/login',
  component: Login
},{
  pathname: '/404',
  component: NotFound
}]

export const adminRoutes = [{
  pathname: '/admin/dashboard',
  component: DashBoard,
  isNav: true,
  title: "仪表盘",
  icon: "dashboard"
},{
  pathname: '/admin/article',
  component: ArticleList,
  isNav: true,
  title: "文章管理",
  icon: "unordered-list"
},{
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit
},{
  pathname: '/admin/setting',
  component: Setting,
  isNav: true,
  title: "设置",
  icon: "setting"
},{
  pathname: '/admin/notifications',
  component: Notification
},{
  pathname: '/admin/profile',
  component: Profile
},{
  pathname: '/admin/noauth',
  component: NoAuth
}]