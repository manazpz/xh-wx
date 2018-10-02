<template>
  <div class="home" ref="home">
    <v-header title="小换"></v-header>
    <sidebar ref="sidebar"></sidebar>
    <div class="homeHead">
      <span class="navigation" @click="showSidebar"></span>
      <mt-navbar  class="navbar" v-model="selected">
        <mt-tab-item id="sy" @click.native="qh('HB')">首页</mt-tab-item>
        <mt-tab-item id="js" @click.native="qh('JB')">集市</mt-tab-item>
      </mt-navbar>
    </div>
    <mt-swipe :stopPropagation="true" :auto="5000" class="banner" style="height: 200px;margin-top: 89px;">
      <mt-swipe-item v-for="item in banners">
        <a :href="item.link" rel="external nofollow" >
          <img :src="item.url" style="height: 100%;width: 100%">
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
              <!--<p>新人可领取200元大礼包</p>-->
            </li>
          </ul>
          <mt-button size="large" class="exchange-btn" @click="tradeUp">换购新机</mt-button>
        </div>
        <div class="h-prompt-img">
          <h4>三天换新机</h4>
          <div>
            <router-link v-for="item in statements" :to="{path:'/statement',query:{title:item.title,content:item.content}}">
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
  // import {mapGetters} from 'vuex'
  import { queryBanners, queryChoiceList } from 'api/home'
  import { queryStatement } from 'api/statement'
  import { queryGoodsList, queryGoodsLableList } from 'api/goods'
  import VHeader from 'components/v-header/v-header'
  import Sidebar from 'components/sidebar/sidebar'

  export default {
    data() {
      return {
        selected: 'sy',
        newGoods: [],
        banners: [],
        statements: [],
        hgGoods: undefined
      }
    },
    created() {
      this.getBanners('HB')
      this.getStatement()
      this.getHgGoods()
      this.getNewGoods()
    },
    methods: {
      showSidebar() {
        this.$refs.sidebar.open()
      },
      getHgGoods() {
        queryGoodsLableList({lable:'=01'}).then(response => {
          if (response.code === 200) {
            this.hgGoods = response.data.items[0]
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
      qh(val) {
        this.getBanners(val)
      },
      getStatement() {
        queryStatement('HT').then(response => {
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
          shopId: '8496770D-6772-4CC2-9508-D08B8DD881Z1',
          model: '01'
        }
        queryGoodsList(query).then(response => {
          if (response.code === 200) {
            this.newGoods = response.data.items
          }
        }).catch(() => {
        })
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
