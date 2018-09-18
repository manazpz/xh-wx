<template>
  <div class="screening" ref="screening">
    <v-header title="机型选择"></v-header>
    <mt-navbar class="navbar" v-model="selected" v-for="item in temp">
      <mt-tab-item :id="item.id">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <div class="model-search" title="搜索框">
      <label>
        <i></i>
        <input type="text" name="" value="" placeholder="搜索您想要的机型">
      </label>
    </div>
    <div class="tab-change-main" title="手机查询切换列表">
      <div class="left-tab-nav">
        <ul>
          <li  v-for="(item,index) in temp[0].detail" @click="selectClass(index,item)" :class="{'select': index ===flag }">{{item.name}}</li>
        </ul>
      </div>
      <div class="right-tab-main">
        <ul class="show">
          <li v-for="item in goods" class="select">{{item.name}}</li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  export default {
    data() {
      return {
        flag: 0,
        name: '',
        classify: '',
        goods: [],
        selected: this.$route.query.msg[0].id,
        temp: this.$route.query.msg,
      }
    },
    created() {
      this.getList()
    },
    methods: {

      getList() {
        this.goods = this.$route.query.msg[0].detail[0].goods
      },
      selectClass(index,item) {
        this.goods = item.goods
        this.flag = index
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "screening.styl";
</style>
