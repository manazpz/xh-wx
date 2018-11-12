import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('../views/home/Login')
const Home = () => import('../views/home/home')
const SCREENING = () => import('../views/screening/screening')
const GoodsDetail = () => import('../views/goods/goodsDetail')
const GoodsNew = () => import('../views/goods/goodsNew')
const OrderSure = () => import('../views/order/orderSure')
const orderDetail = () => import('../views/order/orderDetail')
const Statement = () => import('../views/statement/statement')
const OldAppraisal = () => import('../views/oldAppraisal/oldAppraisal')
const Quote = () => import('../views/quote/quote')
const QuoteDetail = () => import('../views/quote/quoteDetail')
const Recovery = () => import('../views/order/recovery')
const orderList = () => import('../views/order/orderList')
const collect = () => import('../views/collect/collect')
const AddressEdit = () => import('../views/address/addressEdit')
const ManaAddress = () => import('../views/address/manaAddress')
const customService = () => import('../views/customService/customService')
const layIm = () => import('../views/customService/layIm')
const setting = () => import('../views/setting/setting')
const about = () => import('../views/setting/about')
const help = () => import('../views/setting/help')
const term = () => import('../views/setting/term')
const suggestion = () => import('../views/setting/suggestion')
const user = () => import('../views/user/user')
const news = () => import('../views/news/myNews')
const quit = () => import('../views/user/quit')
const encyclopedia = () => import('../views/user/encyclopedia')
const authentication = () => import('../views/user/authentication')
const accountBingDing = () => import('../views/user/account-bingding')
const bingDingSuccess = () => import('../views/user/bingding-success')
const machine = () => import('../views/machine/machine')
const testMachine = () => import('../views/machine/testMachine')
const payment = () => import('../views/order/payment')
const visitRecovery = () => import('../views/order/visitRecovery')
const couponList = () => import('../views/coupon/couponList')
const myCoupon = () => import('../views/coupon/myCoupon')
const getCoupon = () => import('../views/coupon/getCoupon')
const evaluate = () => import('../views/order/evaluate')
const logistics = () => import('../views/order/logistics')
const webError = () => import('../views/error/webError')

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: true,
    meta: { title: '授权' }
  },
  {
    path: '/webError',
    name: 'webError',
    component: webError,
    hidden: true,
    meta: { title: '站点关闭' }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    hidden: true,
    meta: { title: '首页' }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: orderList,
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
    path: '/coupon/myCoupon',
    name: 'myCoupon',
    component: myCoupon,
    meta: { title: '优惠券', icon: '/static/image/icon_li_04.png' }
  },
  {
    path: '/news',
    name: 'news',
    component: news,
    meta: { title: '消息', icon: '/static/image/icon_li_05.png' }
  },
  {
    path: '/customService',
    name: 'customService ',
    component: customService,
    meta: { title: '客服', icon: '/static/image/icon_li_06.png' }
  },
  {
    path: '/customService/layIm',
    name: 'layIm',
    hidden: true,
    component: layIm,
    meta: { title: '客服' }
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting,
    meta: { title: '设置', icon: '/static/image/icon_li_07.png' }
  },
  {
    path: '/setting/about',
    name: 'about',
    hidden: true,
    component: about,
    meta: { title: '关于小换' }
  },
  {
    path: '/setting/help',
    name: 'help',
    hidden: true,
    component: help,
    meta: { title: '使用帮助' }
  },
  {
    path: '/setting/term',
    name: 'term',
    hidden: true,
    component: term,
    meta: { title: '服务条款' }
  },
  {
    path: '/setting/suggestion',
    name: 'suggestion',
    hidden: true,
    component: suggestion,
    meta: { title: '意见反馈' }
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
    path: '/orderDetail',
    name: 'orderDetail',
    component: orderDetail,
    hidden: true,
    meta: {title: '订单详情'}
  },
  {
    path: '/logistics',
    name: 'logistics',
    component: logistics,
    hidden: true,
    meta: {title: '物流详情'}
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
  },
  {
    path: '/user',
    name: 'user',
    component: user,
    hidden: true,
    meta: { title: '用户管理' }
  },
  {
    path: '/user/quit',
    name: 'quit',
    component: quit,
    hidden: true,
    meta: { title: '退出登录' }
  },
  {
    path: '/user/encyclopedia',
    name: 'encyclopedia',
    component: encyclopedia,
    hidden: true,
    meta: { title: '账号百科' }
  },
  {
    path: '/user/authentication',
    name: 'authentication',
    component: authentication,
    hidden: true,
    meta: { title: '用户管理' }
  },
  {
    path: '/user/accountBingDing',
    name: 'accountBingDing',
    component: accountBingDing,
    hidden: true,
    meta: { title: '绑定账户' }
  },
  {
    path: '/user/bingDingSuccess',
    name: 'bingDingSuccess',
    component: bingDingSuccess,
    hidden: true,
    meta: { title: '成功绑定' }
  },
  {
    path: '/machine',
    name: 'machine',
    component: machine,
    meta: { title: '验机列表', icon: '/static/image/icon_li_07.png' }
  },
  {
    path: '/testMachine',
    name: 'testMachine',
    component: testMachine,
    hidden: true,
    meta: { title: '验机' }
  },
  {
    path: '/order/payment',
    name: 'payment',
    component: payment,
    hidden: true,
    meta: { title: '选择收款方式' }
  },
  {
    path: '/order/visitRecovery',
    name: 'visitRecovery',
    component: visitRecovery,
    hidden: true,
    meta: { title: '选择收款方式' }
  },
  {
    path: '/order/evaluate',
    name: 'evaluate',
    component: evaluate,
    hidden: true,
    meta: { title: '评价' }
  },
  {
    path: '/coupon/couponList',
    name: 'couponList',
    component: couponList,
    hidden: true,
    meta: { title: '优惠券' }
  },
  {
    path: '/coupon/myCoupon',
    name: 'myCoupon',
    component: myCoupon,
    hidden: true,
    meta: { title: '我的优惠券' }
  },
  {
    path: '/coupon/getCoupon',
    name: 'getCoupon',
    component: getCoupon,
    hidden: true,
    meta: { title: '可使用优惠券' }
  }
]

export default new Router({
  routes: constantRouterMap
})
