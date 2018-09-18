import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home/home')

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首页', icon: 'home' }
  }
]

export default new Router({
  routes: constantRouterMap
})
