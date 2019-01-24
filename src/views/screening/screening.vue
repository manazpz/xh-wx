<template>
  <div class="screening" ref="screening">
    <v-header title="机型选择"></v-header>
    <mt-navbar  class="navbar" v-model="selected" >
      <mt-tab-item v-if="selecteds.length > 1" v-for="(item,index) in selecteds" :id="item.id" @click.native="qh(index)">{{item.name}}</mt-tab-item>
    </mt-navbar>
    <div class="model-search" title="搜索框">
      <label>
        <i></i>
        <input v-if="model ==='01'" type="text" v-model="searchs" @change="search(searchs)" placeholder="搜索您想购买的机型">
        <input v-else type="text" v-model="searchs" @change="search(searchs)" placeholder="搜索您想换掉的机型">
      </label>
    </div>
    <div v-if="his.length>0" class="his">
      <mt-radio
        ref="radio"
        title="历史搜索"
        @click.native="onRadio($event)"
        :options="his">
      </mt-radio>
    </div>
    <div v-if="isSearch === false" class="tab-change-main" title="手机查询切换列表">
      <div class="left-tab-nav">
        <ul>
          <li  v-for="(item,index) in brands" @click="selectClass(index,item)" :class="{'select': index ===flag }">{{item.name}}</li>
        </ul>
      </div>
      <div class="right-tab-main">
        <ul class="show">
          <div v-for="(item,index) in goods" @click="tz(item)">
            <li :class="{'select': index ===flags }">{{item.name}}</li>
          </div>
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
  import { queryChoiceList, queryGoodsList, updateHomeGoods } from 'api/goods'
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
        his:[],
        model: '',
        data: undefined,
        isSearch: false,
        searchText: '',
        searchs: undefined
      }
    },
    created: function () {
      this.model = this.$route.query.model
      this.getList()
      this.hisSearch();
    },
    methods: {
      hisSearch() {
        this.his = []
        if(window.localStorage.getItem("hs")!= null){
          var search1 = window.localStorage.getItem("hs").split(';');
          for(var i=0;i<4;i++) {
            if(!(search1[i] === '')) {
              this.his.push(search1[i])
            }
            if(search1.length-1===i) {
              break
            }
          }
        }
      },
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
        updateHomeGoods({model:this.$route.query.model,goodsId:item.id,openId:window.localStorage.getItem("openId")}).then(response => {
        }).catch(() => {
        })

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
        var hs = window.localStorage.getItem("hs")
        if(hs === null) {
          window.localStorage.setItem('hs',val+';')
        }else {
          if(!(val === '')) {
            window.localStorage.setItem('hs',val+';'+hs.replace(val+';',''))
          }
        }
        this.hisSearch();
        if (!val) {
          this.isSearch = false
        }else {
          this.isSearch = true
          this.getSearchList(val)
        }
      },
      onRadio(item) {
        var val = item.toElement.innerHTML
        if(!('历史搜索' === val || val.indexOf('<') !== -1)) {
          if(!(val === '')) {
            var cell = this.$refs.radio.$el.getElementsByClassName('mint-cell');
            for (var i = 0; i < cell.length; i++) {
              cell[i].style.background = ''
              cell[i].getElementsByClassName('mint-radio-label')[0].style.color="#000"
            }
            if (this.searchText === val) {
              this.isSearch = false
              this.searchText = ''
            }else {
              item.target.parentElement.parentElement.parentElement.parentElement.style.background="#28c081"
              item.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('mint-radio-label')[0].style.color="#fff"
              this.isSearch = true
              this.searchText = val
              this.getSearchList(val)
            }
          }
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
