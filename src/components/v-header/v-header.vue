<template>
  <div class="header" ref="header">
    <mt-header fixed :title="title" class="osStyle">
      <mt-button icon="back" slot="left" @click="$router.back(-1)"></mt-button>
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
  @import "v-header.styl"
  @import "../../../static/css/style.styl"
</style>

