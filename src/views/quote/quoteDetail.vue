<template>
  <div class="quoteDetail" ref="quoteDetail">
    <v-header title="详情"></v-header>
    <div class="top-inf-appraisal" v-for="item in goods">
      <div class="left-img-box">
          <img :src="item.imgs.length>0?item.imgs[0].url:''" title="产品">
      </div>
      <div class="right-inf-box">
          <h2><span>{{item.goodsName}}</span></h2>
          <h3>
              <span class="pXh">{{item.bllParameterStr}}</span>
          </h3>
          <div>
              <p v-if="item.model === '02'">最终成交价以工程师检验为准</p>
              <strong><em>￥</em><span>{{item.bllPrice}}</span></strong>
          </div>
      </div>
    </div>
    <div v-if="goods[0].model == '02'" class="echarts-main" title="价格趋势echarts">
      <h2>价格趋势</h2>
      <p>预计下周跌幅40元</p>
      <div ref="container" style="height: 100%"></div>
    </div>

    <div class="promise-main" title="我们的承诺图片">
      <h2>我们承诺</h2>
      <div class="promise-img">
        <img src="/static/image/prompt_img2.png" title="我们的承诺">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryReplacementCarDetail, queryForecastList } from 'api/goods'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        openId: '',
        id: '',
        chart: null,
        nowData: '',
        nowYear: '',
        nowMonth: '',
        week: [],
        price: [],
        nowprice: '',
        goods: [{model :'', imgs:[]}]
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.id = this.$route.query.id
      this.getType()
    },
    methods: {
      getType() {
        queryForecastList({id:this.id}).then(response => {
          this.week  = response.data.items[0].datas
          this.price  = response.data.items[0].price
          this.nowprice  = response.data.items[0].now
          this.getList()
        }).catch(() => {
        })
      },
      getList() {
        queryReplacementCarDetail({openId:this.openId,id:this.id}).then(response => {
          if (response.code === 200) {
            if(response.data.newGoods.length !== 0){
              this.goods = response.data.newGoods
            }else if(response.data.oldGoods.length !== 0){
              this.goods = response.data.oldGoods
            }
            var lets = this.goods[0].bllPrice/this.nowprice
            this.price.forEach((value, index) => {
              value = parseFloat((value*lets).toFixed(2))
              this.price[index] = value
            })
            this.$nextTick(function () {
              this.functionEcharts()
            })
          }
        }).catch(() => {
        })
      },
      functionEcharts(){
        if(this.goods[0].model == '02'){
          var option = {
            tooltip : {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            },
            grid: {
              left: '8%',
              right: '8%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                boundaryGap : false,
                // data : ['4月','5月','6月','7月','8月',''],
                data : this.week,
              }
            ],
            yAxis : [
              {
                type: 'value'
              }
            ],
            series : [
              {
                name:'价格趋势',
                type:'line',
                stack: '总量',
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    color:'#222',
                    lineStyle:{
                      color:'#222',
                      width:3
                    }
                  }
                },

                itemStyle:{
                  normal:{
                    color:'#d8f5e6',
                    lineStyle:{
                      color:'#3acc82'
                    }
                  }
                },

                areaStyle: {normal: {

                  }},
                // data:[3210, 2850, 2630, 2570, 2420]
                data:this.price
              }
            ]
          }
          this.chart = echarts.init(this.$refs.container)
          this.chart.setOption(option)
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
  @import "quoteDetail.styl";
</style>
