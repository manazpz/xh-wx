<template>
  <div class="customService" ref="customService">
    <v-header title="设置"></v-header>
    <div class="set-main-list">
      <ul>
        <li><a href="javascript:;" @click="jump('/setting/about')" title="关于小换">关于小换</a></li>
        <li><a href="javascript:;" @click="jump('/setting/suggestion')" title="意见反馈">意见反馈</a></li>
        <li><a href="javascript:;" @click="jump('/setting/term?type=FT')" title="服务条款">服务条款</a></li>
        <li><a href="javascript:;" @click="jump('/statement?type=YT')" title="隐私政策">隐私政策</a></li>
        <li><a href="javascript:;" @click="jump('/setting/help?type=SB')" title="使用帮助">使用帮助</a></li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      jump(view) {
        this.$router.push({path:view})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "setting.styl";
</style>
