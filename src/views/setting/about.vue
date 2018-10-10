<template>
  <div class="about" ref="about">
    <v-header title="关于小焕"></v-header>
    <div class="about-main">
      <dl>
        <dt><img src="http://47.106.177.213/favicon.jpg"></dt>
        <dd><span>小换 v1.0.0</span></dd>
      </dl>
      <p>小换平台系统，是一个线上线下综合交易平台。主要突出“ 旧机当前用 ，换新机”的商业特征！旨在引领中国消费者第一时间将旧机价值最大化，发现和体验更优质的换机体验。</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "about.styl";
</style>
