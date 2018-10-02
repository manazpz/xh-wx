<template>
  <div class="screening" ref="screening">
    <v-header title="机型选择"></v-header>
    <mt-navbar  class="navbar" v-model="selected" >
      <mt-tab-item v-if="selecteds.length > 1" v-for="(item,index) in selecteds" :id="item.id" @click.native="qh(index)">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <div class="model-search" title="搜索框">
      <label>
        <i></i>
        <input type="text" v-model="searchs" @change="search(searchs)" placeholder="搜索您想要的机型">
      </label>
    </div>
    <div v-if="isSearch === false" class="tab-change-main" title="手机查询切换列表">
      <div class="left-tab-nav">
        <ul>
          <li  v-for="(item,index) in brands" @click="selectClass(index,item)" :class="{'select': index ===flag }">{{item.name}}</li>
        </ul>
      </div>
      <div class="right-tab-main">
        <ul class="show">
          <router-link v-for="(item,index) in goods" :to="item.model === '01'?{path:'/goods/new',query:{id:item.id}}:{path:'/oldAppraisal',query:{id:item.id,name:item.name,price:item.banPrice}}">
            <li :class="{'select': index ===flags }">{{item.name}}</li>
          </router-link>
        </ul>
      </div>
    </div>
    <div v-if="isSearch === true" class="tab-change-main" >
      <mt-cell v-for="(item,index) in searchGoods" @click.native="tz(item)" :title="item.name"></mt-cell>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryChoiceList, queryGoodsList } from 'api/goods'
  export default {
    data() {
      return {
        flag: 0,
        flags: 0,
        brands: [],
        goods: [],
        searchGoods: [],
        selected: '',
        selecteds: [],
        data: undefined,
        isSearch: false,
        searchs: undefined
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
            this.data = response.data.items
          }
        }).catch(() => {
        })
      },
      getSearchList(val) {
        queryGoodsList({model:this.$route.query.model,wxQuery:val}).then(response => {
          if (response.code === 200) {
              this.searchGoods = response.data.items
          }
        }).catch(() => {
        })
      },
      selectClass(index,item) {
        this.goods = item.goods
        this.flag = index
      },
      tz(item) {
        if(item.model === '01') {
          this.$router.push({path: '/goods/new', query: {id:item.id}})
        }
        if(item.model === '02') {
          this.$router.push({path: '/oldAppraisal', query: {id:item.id,name:item.name,price:item.banPrice}})
        }
      },
      qh(index) {
        this.brands = this.data[index].detail
        this.goods = this.data[index].detail.length >0?this.data[index].detail[index].goods:[]
      },
      search(val) {
        if (!val) {
          this.isSearch = false
        }else {
          this.isSearch = true
          this.getSearchList(val)
        }
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
