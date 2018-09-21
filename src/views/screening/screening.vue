<template>
  <div class="screening" ref="screening">
    <v-header title="机型选择"></v-header>
    <mt-navbar class="navbar" v-model="selected" v-for="item in selecteds">
      <mt-tab-item :id="item.id">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <div class="model-search" title="搜索框">
      <label>
        <i></i>
        <input type="text" value="" placeholder="搜索您想要的机型">
      </label>
    </div>
    <div class="tab-change-main" title="手机查询切换列表">
      <div class="left-tab-nav">
        <ul>
          <li  v-for="(item,index) in brands" @click="selectClass(index,item)" :class="{'select': index ===flag }">{{item.name}}</li>
        </ul>
      </div>
      <div class="right-tab-main">
        <ul class="show">
          <router-link v-for="item in goods" :to="item.model === '01'?{path:'/goods/new',query:{id:item.id}}:{path:'/goods/new',query:{id:item.id}}">
            <li class="select">{{item.name}}</li>
          </router-link>
        </ul>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryChoiceList } from 'api/goods'
  export default {
    data() {
      return {
        flag: 0,
        brands: [],
        goods: [],
        selected: '',
        selecteds: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        queryChoiceList({model:this.$route.query.model}).then(response => {
          if (response.code === 200) {
            this.selecteds = response.data.items
            this.selected = response.data.items[0].id
            this.brands = response.data.items[0].detail
            this.goods = response.data.items[0].detail[0].goods
            debugger
          }
        }).catch(() => {
        })
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
