<template>
  <div class="home" ref="home">
    <v-header title="小换"></v-header>
    <sidebar ref="sidebar"></sidebar>
    <div class="homeHead">
      <span class="navigation" @click="showSidebar"></span>
      <mt-navbar class="navbar" v-model="selected">
        <mt-tab-item id="sy">首页</mt-tab-item>
        <mt-tab-item id="js">集市</mt-tab-item>
      </mt-navbar>
    </div>

    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="sy">
        <mt-swipe :stopPropagation="true" :prevent="true" :auto="5000" class="banner" style="height: 200px;margin-top: 40px">
          <mt-swipe-item v-for="item in banners">
            <img :src="item.url" style="height: 100%;width: 100%">
          </mt-swipe-item>
        </mt-swipe>
        <div class="home-change-purchase">
          <ul>
            <li>
              <span>旧机</span>
              <a>
                <strong>iPhone 6/iPhone 6plus</strong>
              </a>
            </li>
            <li>
              <span>新机</span>
              <a>
                <strong>iPhone X/iPhone 8</strong>
              </a>
            </li>
            <li>
              <p>新人可领取200元大礼包</p>
            </li>
          </ul>
          <mt-button size="large" class="exchange-btn">换购新机</mt-button>
        </div>
        <div class="h-prompt-img">
          <h4>三天换新机</h4>
          <div v-for="item in statements">
            <a href="javascript:;" title="旧机估价">
              <img :src="item.imgUrl">
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="js">
        <mt-cell v-for="n in 4" :title="'content ' + n" />
      </mt-tab-container-item>
    </mt-tab-container>



  </div>
</template>

<script type="text/ecmascript-6">
  // import {mapGetters} from 'vuex'
  import { queryBanners } from 'api/home'
  import { queryStatement } from 'api/statement'
  import VHeader from 'components/v-header/v-header'
  import Sidebar from 'components/sidebar/sidebar'

  export default {
    data() {
      return {
        selected: 'sy',
        banners: [],
        statements: []
      }
    },
    created() {
      this.getBanners()
      this.getStatement()
    },
    methods: {
      showSidebar() {
        this.$refs.sidebar.open()
      },
      getBanners() {
        queryBanners('HB').then(response => {
          if (response.code === 200) {
            this.banners = response.data.items
          }
        }).catch(() => {
        })
      },
      getStatement() {
        queryStatement('HT').then(response => {
          if (response.code === 200) {
            this.statements = response.data.items
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
  @import "home.styl"
</style>
