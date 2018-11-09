<template>
  <div class="myNews" ref="myNews">
    <v-header title="我的消息"></v-header>
    <div class="my-news-tab">
      <ul ref="ul">
        <li @click="qh('ALL')" ref="ALL" class="select"><a href="javascript:;">全部</a></li>
        <li @click="qh('WL',{type:'02'})" ref="WL"><a href="javascript:;">物流</a></li>
        <li @click="qh('DDTZ',{type:'01'})" ref="DDTZ"><a href="javascript:;">通知</a></li>
        <li @click="qh('YHQ',{type:'03'})" ref="YHQ"><a href="javascript:;">优惠券</a></li>
        <li @click="qh('HD',{type:'04'})" ref="HD"><a href="javascript:;">活动</a></li>
      </ul>
    </div>
    <div class="my-news-main">
      <div v-if="order.length > 0" class="news-inf-box show">
        <ul >
          <li v-for="(item1,index1) in order" class="fresh-li">
            <h1>
              <strong>{{item1|orderLogType}}</strong>
              <span>{{item1.createTime}}</span>
            </h1>
            <dl>
              <dt v-if="item1.oldOrder.length > 0" >
                <img :src="item1.oldOrder[0].imgs[0].url">
              </dt>
              <dt v-else>
                <img :src="item1.newOrder[0].imgs[0].url">
              </dt>
              <dd v-if="item1.oldOrder.length > 0 && item1.newOrder.length > 0 ">
                <h2 >换购  {{item1.oldOrder[0].goodsName}}换购{{item1.newOrder[0].goodsName}}</h2>
                <span>{{item1.newOrder[0].parameterStr}}</span>
                <p> 订单编号：{{item1.number}}</p>
              </dd>
              <dd v-if="item1.oldOrder.length == 0 && item1.newOrder.length > 0 ">
                <h2 >购新机  {{item1.newOrder[0].goodsName}}</h2>
                <span>{{item1.newOrder[0].parameterStr}}</span>
                <p> 订单编号：{{item1.number}}</p>
              </dd>
              <dd v-if="item1.oldOrder.length > 0 && item1.newOrder.length == 0">
                <h2 >卖旧机  {{item1.oldOrder[0].goodsName}}</h2>
                <span>{{item1.oldOrder[0].parameterStr}}</span>
                <p> 订单编号：{{item1.number}}</p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
      <div class="news-inf-box">
        <ul>
          <li class="fresh-li li-style-01">
            <h1>
              <strong>你有300元的优惠券今天将到期</strong>
              <span>今天  16:30</span>
            </h1>
            <dl>
              <dt><img src=""></dt>
              <dd>
                <h2>夏季热卖活动优惠券可享折上折，夏日的狂欢盛宴，机智如你，省钱的机会...</h2>
                <p><a href="javascript:;">查看详情</a></p>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryMyNews } from 'api/news'
  import { orderLogType } from '../../utils/filter'

  export default {
    data() {
      return {
        openId: '',
        list: null,
        navbar: 'ALL',
        order: [],
        query: {
          openId:''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    filters: {
      orderLogType
    },
    methods: {
      getList() {
        this.query.openId = this.openId
        queryMyNews(this.query).then(response => {
          this.order = []
          if (response.code === 200) {
            if(response.data.items != undefined){
              response.data.items .forEach((value,index) => {
                if(value.type === '01'){
                  this.order.push(value)
                }
              })
            }
          }
        }).catch(() => {
        })
      },
      restQuery(v) {
        if(v != undefined) {
          this.query = v
          this.query.openId = this.openId
        }else {
          this.query = {
            openId:this.openId
          }
        }
      },
      qh(key,v) {
        if(this.$refs[key].className != 'select') {
          this.navbar = key
          var dom = this.$refs.ul.children
          for (var i=0;i<dom.length;i++) {
            dom[i].className = ''
          }
          this.$refs[key].className = 'select'
          //切换数据
          this.restQuery(v)
          this.getList()
        }
      },
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "myNews.styl";
</style>
