<template>
  <div class="goodsNew" ref="goodsNew">
    <v-header title="商品详情"></v-header>
    <mt-navbar  class="navbar" v-model="selected">
      <mt-tab-item id="sp">商品</mt-tab-item>
      <mt-tab-item id="xq">详情</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="sp" class="sp">
        <mt-swipe :stopPropagation="true" :prevent="true" :auto="5000" class="banner" style="height: 250px;">
          <mt-swipe-item v-for="item in detail.imgs">
            <img :src="item.url" style="height: 100%;width: 100%">
          </mt-swipe-item>
        </mt-swipe>
        <div class="merchandise-des" price="0">
          <h3><span>{{detail.name}}</span></h3>
          <p><i>￥</i><span>{{price}}</span></p>
        </div>
        <mt-radio
          :ref="'radio'+index"
          :title="item.name"
          v-model="checks[index]"
          v-for="(item,index) in checksData" style="overflow:auto;zoom:1;"
          @change="checkRadio($event,index)"
          @click.native="onRadio($event,index)"
          :options="item.spec">
        </mt-radio>
        <mt-button class="confirm-btn" @click="confirm()">确定</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="xq">
        <div class="detail">
          <div class="detail1" v-html="detail.detail">
          </div>
        </div>

      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script type="text/ecmascript-6">
  import { queryGoodsDetail, insertReplacementCar } from 'api/goods'
  import VHeader from 'components/v-header/v-header'


  export default {
    data() {
      return {
        selected: 'sp',
        detail: {imgs:[],specParameter:[{spec:[]}]},
        price: 0,
        checks: [],
        checksData: [],
        specpar: [],
        temp: {
          openId: '',
          goodsId: '',
          price: 0,
          model: '01',
          parameter: []
        },
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getDetail()
    },
    methods: {
      getDetail() {
        queryGoodsDetail(this.$route.query.id).then(response => {
          if (response.code === 200) {
            this.detail = response.data.items[0]
            this.detail.specParameter.sort(function(a,b){return a.price-b.price})
            this.price = this.detail.specParameter[0].price
            this.formatData(this.detail.specParameter)
          }
        }).catch(() => {
        })
      },
      checkRadio: function(value,index){
        var str = ''
        this.checks[index] = value
        for (var i = 0; i < this.checks.length; i++) {
          str += this.checks[i]
        }
        for (var i = 0; i < this.detail.specParameter.length; i++) {
          var spec = this.detail.specParameter[i].spec
          var str1 = ''
          this.specText = ' '
          for (var j = 0; j < spec.length; j++) {
            str1 += spec[j].spec_sort
            this.specText += spec[j].spec_value_name + ' '
          }
          if(str === str1) {
            this.price = this.detail.specParameter[i].price
          }
        }
      },
      onRadio(item,index) {
        if (item.target.parentElement.parentElement.parentElement.parentElement.className === 'mint-cell') {
          var cell = this.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
          for (var i = 0; i < cell.length; i++) {
            cell[i].style.background = ''
            cell[i].getElementsByClassName('mint-radio-label')[0].style.color="#000"
          }
          item.target.parentElement.parentElement.parentElement.parentElement.style.background="#28c081"
          item.target.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('mint-radio-label')[0].style.color="#fff"
        }
      },
      formatData(data) {
        var params = []
        //合并数据
        data.forEach(function (value1, index) {
          if (index === 0) {
            value1.spec.forEach(function (value2, index) {
              var map = {'id':value2.id,'name':value2.name,'px':value2.px,'spec':[{value:value2.spec_sort,label:value2.spec_value_name}]}
              params.push(map)
            })
          }else {
            value1.spec.forEach(function (value2, index) {
              params.forEach(function (value3, index) {
                if(value2.id === value3.id) {
                  var map = {value:value2.spec_sort,label:value2.spec_value_name}
                  value3.spec.push(map)
                }
              })
            })
          }
        })
        //去重
        params.forEach(function (value, index) {
          var hash = {}
          value.spec = value.spec.reduce(function(item, next) {
            hash[next.value] ? '' : (hash[next.label] ? '' : hash[next.label] = true && item.push(next))
            return item
          }, [])
        })
        this.checksData = params
        this.$nextTick(function(){
          this.checksData.forEach((value, index) => {
            this.checks[index] = value.spec[0].value
            var cell = this.$refs['radio'+index][0].$el.getElementsByClassName('mint-cell')
            cell[0].getElementsByClassName('mint-radio-label')[0].style.color="#fff"
            cell[0].style.background="#28c081"
          })
        })
      },
      confirm() {
        let cur = this
        this.detail.specParameter.forEach((value, index) => {
          value.spec.forEach((values, index1) => {
            cur.specpar.push(values.spec_sort)
          })
          if(JSON.stringify(cur.checks) == JSON.stringify(cur.specpar)){
            cur.temp.parameter = '['+JSON.stringify(value)+']'
          }else{
            cur.specpar = []
          }
        })
        this.temp.goodsId = this.$route.query.id
        this.temp.price = this.price
        this.temp.openId = this.openId
        this.temp.parameter = JSON.parse(this.temp.parameter)
        insertReplacementCar(this.temp).then(response => {
          if (response.code === 200) {
            setTimeout(function() {
              cur.$router.push({path: '/quote'})
            },1000);
          }
        }).catch(() => {
        })
      }
    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "goodsNew.styl";
</style>
