import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home/home')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    }
  ],
  linkActiveClass:'active'
})
