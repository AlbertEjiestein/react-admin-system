import {
  NotFound,
  Login,
  Dashboard,
  ArticleList,
  ArticleEdit,
  Setting,
  Notification,
  NoAuth,
  Profile
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
  component: Dashboard,
  isNav: true,
  icon: 'dashboard',
  title: '仪表盘',
  roles: ['001','002','003']
},{
  pathname: '/admin/article',
  component: ArticleList,
  isNav: true,
  title: '文章管理',
  icon: 'unordered-list',
  exact: true,
  roles: ['001','002']
},{
  pathname: '/admin/article/edit/:id',
  component: ArticleEdit,
  roles: ['001','002']
},{
  pathname: '/admin/notifications',
  component: Notification,
  roles: ['001','002']
},{
  pathname: '/admin/setting',
  component: Setting,
  isNav: true,
  icon: 'setting',
  title: '设置',
  roles: ['001']
},{
  pathname: '/admin/profile',
  component: Profile,
  roles: ['001','002','003']
},{
  pathname: '/admin/noauth',
  component: NoAuth,
  roles: ['001','002','003']
}]