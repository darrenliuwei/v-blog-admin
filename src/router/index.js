import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '@/store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 管理员登录
  { path: '/login', component: () => import('@/views/Login.vue') },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/dashboard',
    children: [
      // 后台管理首页
      { path: 'dashboard', meta: { title: '刘伟博客-后台管理' }, component: () => import('@/views/dashboard/index.vue') },
      // 文章列表
      { path: '/article/list', meta: { title: '刘伟博客-后台管理-文章列表' }, component: () => import('@/views/article/list.vue') },
      // 添加文章
      { path: '/article/add', meta: { title: '刘伟博客-后台管理-添加文章' }, component: () => import('@/views/article/add.vue') },
      // 修改文章
      { path: '/article/edit', meta: { title: '刘伟博客-后台管理-修改文章' }, component: () => import('@/views/article/edit.vue') },
      // 文章回收站
      { path: '/article/recycle', meta: { title: '刘伟博客-后台管理-文章回收站' }, component: () => import('@/views/article/recycle.vue') }
    ]
  }
]

// 防止左侧菜单栏重复点击相同的菜单选项而报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截,判断用户是否登录，只有用户登录了，才能访问所有的路由
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.path === '/login') {
    next()
  } else if (Store.state.token) {
    next()
  } else {
    next('/login')
  }
})

export default router
