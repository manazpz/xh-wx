<template>
  <div class="home" ref="home">
    <sidebar ref="sidebar"></sidebar>
    <div class="homeHead">
      <span class="navigation" @click="showSidebar"></span>
      <mt-navbar  class="navbar" v-model="selected">
        <span>{{}}</span>
        <mt-tab-item v-if="homeLable[0]&&homeLable[0].isEnable === 'Y'" id="sy" @click.native="qh('HB')">首页</mt-tab-item>
        <mt-tab-item v-if="homeLable[1]&&homeLable[1].isEnable === 'Y'" id="js" @click.native="qh('JB')">集市</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-swipe :stopPropagation="true" :auto="5000" class="banner" style="height: 8.8rem; margin-top: 50px;">
      <mt-swipe-item v-for="item in banners">
        <a :href="item.link" rel="external nofollow" >
          <img :src="item.url" style="height: auto;width: 100%">
        </a>
      </mt-swipe-item>
    </mt-swipe>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="sy">
        <div class="home-change-purchase">
          <ul>
            <li>
              <span>旧机</span>
              <a>
                <strong @click="choise('02')">{{hgGoods && hgGoods.oldGoods.length > 0?hgGoods.oldGoods[0].name:''}}</strong>
              </a>
            </li>
            <li>
              <span>新机</span>
              <a>
                <strong @click="choise('01')">{{hgGoods && hgGoods.newGoods.length > 0?hgGoods.newGoods[0].name:''}}</strong>
              </a>
            </li>
            <li>
              <p @click="couponList">新人可领取{{price}}元大礼包</p>
            </li>
          </ul>
          <mt-button size="large" class="exchange-btn" @click="tradeUp">换购新机</mt-button>
        </div>
        <div class="h-prompt-img">
          <h4>放心换新机</h4>
          <div>
            <router-link v-for="item in statements" :to="{path:'/statement',query:{title:item.title,id:item.id}}">
              <img :src="item.imgUrl">
              <span>{{item.title}}</span>
            </router-link>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="js">
        <div class="old-machine-btn">
            <mt-button size="large" class="exchange-btn" @click="choise('02')">旧机估价</mt-button>
        </div>
        <div class="market-list-box">
          <h1>新机热购</h1>
          <ul>
            <router-link v-for="item in newGoods" :to="{path:'/goods/detail',query:{id:item.id}}">
              <li>
                <img :src="item.imgs.length>0?item.imgs[0].url:''">
                <span>{{item.name}}</span>
                <strong>￥{{item.specParameter[0].price}}</strong>
              </li>
            </router-link>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import { queryBanners, queryChoiceList, homeLabelList } from 'api/home'
  import { queryStatement } from 'api/statement'
  import { queryGoodsList, queryGoodsLableList } from 'api/goods'
  import { queryCouponList } from 'api/coupon'
  import VHeader from 'components/v-header/v-header'
  import Sidebar from 'components/sidebar/sidebar'

  export default {
    data() {
      return {
        selected: 'sy',
        homeLable: [],
        newGoods: [],
        banners: [],
        statements: [],
        price: 0,
        hgGoods: undefined
      }
    },
    created() {
      window.localStorage.setItem('openId','oaCWN0sZrB1zR7SGL2V55ej1OK9M')
      // this.openId = window.localStorage.getItem("openId")
      this.getHomeLabel()
      this.getBanners('HB')
      this.getStatement()
      this.getHgGoods()
      this.getNewGoods()
      this.getCoupon()
    },
    methods: {
      showSidebar() {
        this.$refs.sidebar.open()
      },
      getHomeLabel() {
        homeLabelList({pageSize: 20}).then(response => {
          if (response.code === 200) {
            this.homeLable = response.data.items
          }
        }).catch(() => {
        })
      },
      getHgGoods() {
        queryGoodsLableList({lable:'=01',openId:window.localStorage.getItem("openId")}).then(response => {
          if (response.code === 200) {
            this.hgGoods = response.data
          }
        }).catch(() => {
        })
      },
      getBanners(val) {
        queryBanners(val).then(response => {
          if (response.code === 200) {
            this.banners = response.data.items
          }
        }).catch(() => {
        })
      },
      getCoupon(){
        queryCouponList({status:'01',type:'XC'}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              response.data.items .forEach((value,index) => {
                this.price += value.price
              })
            }
          }
        }).catch(() => {
        })
      },
      qh(val) {
        this.getBanners(val)
      },
      getStatement() {
        queryStatement({type:'HT'}).then(response => {
          if (response.code === 200) {
            this.statements = response.data.items
          }
        }).catch(() => {
        })
      },
      choise(val) {
        this.$router.push({path: 'screening', query: {model: val}})
      },
      tradeUp() {
        this.$router.push('quote')
      },
      getNewGoods() {
        var query = {
          model: '01'
        }
        queryGoodsList(query).then(response => {
          if (response.code === 200) {
            this.newGoods = response.data.items
          }
        }).catch(() => {
        })
      },
      couponList(){
        this.$router.push({path: '/coupon/couponList', query: {}})
      }
    },
    //注册组件
    components: {
      VHeader,
      Sidebar
    }
    // computed: {
    //   //返回当前模式
    //   model() {
    //     return this.isNight ? 'night' : 'morning'
    //   },
    //   ...mapGetters([
    //     'isNight'
    //   ])
    // }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "home.styl";
</style>
