import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home/home')

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: Home,
    hidden: true,
    meta: { title: '首页' }
  },
  {
    path: '/order',
    name: 'order',
    component: Home,
    meta: { title: '订单', icon: '/static/image/icon_li_01.png' }
  },
  {
    path: '/collect',
    name: 'collect',
    component: Home,
    meta: { title: '收藏', icon: '/static/image/icon_li_02.png' }
  },
  {
    path: '/replacement',
    name: 'replacement',
    component: Home,
    meta: { title: '置换车', icon: '/static/image/icon_li_03.png' }
  },
  {
    path: '/coupon',
    name: 'coupon',
    component: Home,
    meta: { title: '优惠券', icon: '/static/image/icon_li_04.png' }
  },
  {
    path: '/news',
    name: 'news',
    component: Home,
    meta: { title: '消息', icon: '/static/image/icon_li_05.png' }
  },
  {
    path: '/cs',
    name: 'cs',
    component: Home,
    meta: { title: '客服', icon: '/static/image/icon_li_06.png' }
  },
  {
    path: '/setting',
    name: 'setting',
    component: Home,
    meta: { title: '设置', icon: '/static/image/icon_li_07.png' }
  }
]

export default new Router({
  routes: constantRouterMap
})
