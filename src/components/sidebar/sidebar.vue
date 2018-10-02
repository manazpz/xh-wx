<template>
  <div style="background: #c0c0c0">
    <transition name="fold">
      <div class="sidebar" v-show="showFlag">
        <div class="top-pic">
          <dl>
            <dt>
              <img src="/static/image/pic_img.png" title="头像">
            </dt>
            <p>Acid</p>
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
        showFlag: false,
      }
    },
    //生命周期创建观察数据
    created() {
      this.fetchData();
    },
    methods: {
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
  @import "sidebar.styl"
</style>
