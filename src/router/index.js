import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../views/home/home')
const SCREENING = () => import('../views/screening/screening')
const GoodsDetail = () => import('../views/goods/goodsDetail')
const GoodsNew = () => import('../views/goods/goodsNew')
const OrderSure = () => import('../views/order/orderSure')
const Statement = () => import('../views/statement/statement')
const OldAppraisal = () => import('../views/oldAppraisal/oldAppraisal')
const Quote = () => import('../views/quote/quote')
const QuoteDetail = () => import('../views/quote/quoteDetail')
const Recovery = () => import('../views/order/recovery')
const collect = () => import('../views/collect/collect')
const AddressEdit = () => import('../views/address/addressEdit')
const ManaAddress = () => import('../views/address/manaAddress')

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
    component: collect,
    meta: { title: '收藏', icon: '/static/image/icon_li_02.png' }
  },
  {
    path: '/quote',
    name: 'quote',
    component: Quote,
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
  },
  {
    path: '/screening',
    name: 'screening',
    hidden: true,
    component: SCREENING,
    meta: { title: '机型选择' }
  },
  {
    path: '/goods/new',
    name: 'goodsNew',
    component: GoodsNew,
    hidden: true,
    meta: { title: '新商品' }
  },
  {
    path: '/goods/detail',
    name: 'goodsDetail',
    component: GoodsDetail,
    hidden: true,
    meta: { title: '商品详情' }
  },
  {
    path: '/order/sure',
    name: 'orderSure',
    component: OrderSure,
    hidden: true,
    meta: { title: '确定订单' }
  },
  {
    path: '/statement',
    name: 'statement',
    component: Statement,
    hidden: true,
    meta: { title: '声明' }
  },
  {
    path: '/oldAppraisal',
    name: 'oldAppraisal',
    component: OldAppraisal,
    hidden: true,
    meta: { title: '旧机估计' }
  },
  {
    path: '/quote/detail',
    name: 'quoteDetail',
    component: QuoteDetail,
    hidden: true,
    meta: { title: '详情' }
  },
  {
    path: '/order/recovery',
    name: 'recovery',
    component: Recovery,
    hidden: true,
    meta: { title: '回收方式' }
  },
  {
    path: '/addressEdit',
    name: 'addressEdit',
    component: AddressEdit,
    hidden: true,
    meta: { title: '编辑地址' }
  },
  {
    path: '/manaAddress',
    name: 'manaAddress',
    component: ManaAddress,
    hidden: true,
    meta: { title: '管理收货地址' }
  }
]

export default new Router({
  routes: constantRouterMap
})
