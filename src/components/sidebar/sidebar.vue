<template>
  <div style="background: #c0c0c0">
    <transition name="fold">
      <div class="sidebar" v-show="showFlag">
        <div class="top-pic">
          <dl>
            <dt>
              <img clsss="imgs" :src="list.headPortrait" @click="jumpUser" title="头像">
            </dt>
            <p>{{list.nickName}}</p>
          </dl>
        </div>
        <scroll :data="data" class="themes-list" ref="scroll">
          <ul style="padding-left: 10px">
            <router-link v-for="item in data" v-if="!item.hidden" :to="resolvePath(item.path)">
              <li class="themes">
                <img class="icons" :src="item.meta.icon">
                <div class="themetitle">{{item.meta.title}}</div>
              </li>
            </router-link>
          </ul>
        </scroll>
        <!--<div class="bottom-menu">-->
          <!--<div class="menu">-->
            <!--<div class="avatar"><i class="icon iconfont icon-lixianwenjian"></i></div>-->
            <!--<div class="name">离线</div>-->
          <!--</div>-->
          <!--<div class="menu" @click="setIsNight">-->
            <!--<div class="avatar"><img :src="modelImg" width="18" height="18"></div>-->
            <!--<div class="name">{{modelText}}</div>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" @click.stop.prevent="hide" v-show="showFlag"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import path from 'path'
  import Scroll from 'base/scroll/scroll'
  import {mapGetters, mapMutations} from 'vuex'
  import store from '../../store'
  import { queryUserinfos } from 'api/system'
  import router from '../../router'

  export default {
    //接收父组件传值
    props: {
      currentIndex: {
        type: Number,
        default: -1                    //当前高亮主题默认id
      }
    },
    data() {
      return {
        data: [],                        //初始化主题列表数据,
        list:[{headPortrait:''}],
        showFlag: false,
        openId: undefined
      }
    },
    //生命周期创建观察数据
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
      this.fetchData();
    },
    methods: {
      getList() {
        queryUserinfos({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              this.list = response.data.items[0]
              const roles = this.list.roles
              store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
                router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                this.fetchData()
              })
            }
          }
        }).catch(() => {
        })
      },
      open() {
        this.showFlag = true
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
      },
      //隐藏侧边栏，向上派发事件
      hide() {
        this.showFlag = false
      },
      //获取主题列表数据
      fetchData() {
        var routers = store.getters.routers
        if (routers.length > 0) {
          this.data = routers
        }
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      },
      jumpUser(openid){
        this.$router.push({path:'/user'})
      },
      ...mapMutations({
        setIsNight: 'CHANGE_MODEL'
      })
    },
    computed: {
      modelText() {
        return this.isNight ? '日间' : '夜间'
      },
      //改变模式图片
      modelImg() {
        if (!this.isNight) {
          return require('./yejian.png')
        } else {
          return require('./rijian.png')
        }
      },
      ...mapGetters([
        'isNight'
      ])
    },
    //注册组件
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "sidebar.styl";
</style>
