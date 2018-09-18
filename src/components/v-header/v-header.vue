<template>
  <div class="header" ref="header">
    <mt-header :title="title" class="osStyle">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    //接收从父组件传来的标题值
    props: {
      title: {
        type: String,
        default: '小换'           //标题默认值
      }
    },
    methods: {

    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../static/css/style.styl"
</style>

