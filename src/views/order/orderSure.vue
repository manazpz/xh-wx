<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="确认订单"></v-header>
    <div class="address-inf-box">
      <p class="p-null" title="未填写收货地址时"><a href="">您的收货地址为空，为您的手机添加地址吧！</a></p>
    </div>

    <div class="c-des-list" v-if="data.oldGoods.length > 0">
      <h3>旧机估价</h3>
      <ul>
        <li v-for="item in data.oldGoods">
          <div class="li-left-img">
            <img :src="item.imgs.length>0?item.imgs[0].url:''" >
          </div>
          <div class="li-right-inf">
            <h4><span>{{item.goodsName}}</span></h4>
            <h5>{{item.bllParameterStr}}</h5>
            <h6>估价：<span>￥{{item.bllPrice}}</span></h6>
            <div>
              <p>最终回收价以工程师检测为准</p>
              <span>x 1</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="subtotal-box">
        共<span>{{data.oldGoods.length}}</span>件商品&nbsp;&nbsp;小计：<strong>￥{{sData.sumOldPrice}}</strong>
      </div>
    </div>

    <div class="c-des-list" v-if="data.newGoods.length > 0">
      <h3>{{newTile}}</h3>
      <ul>
        <li v-for="item in data.newGoods">
          <div class="li-left-img">
            <img :src="item.imgs.length>0?item.imgs[0].url:''" >
          </div>
          <div class="li-right-inf">
            <h4><span>{{item.goodsName}}</span></h4>
            <h5>{{item.bllParameterStr}}</h5>
            <h6>估价：<span>￥{{item.bllPrice}}</span></h6>
            <i class="i-img"></i>
            <div>
              <p>价格<b class="through">￥9600.00</b></p>
              <span>x 1</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="subtotal-box">
        共<span>{{data.newGoods.length}}</span>件商品&nbsp;&nbsp;小计：<strong>￥{{sData.sumNewPrice}}</strong>
      </div>
    </div>

    <div class="details-inf">
      <ul>
        <li>
          <span>售后服务</span>
          <a href="javascript:;">全国联保</a>
        </li>
        <li>
          <span>回收方式</span>
          <!--<a href="javascript:;" class="right-arrow">上门回收</a>-->
          <router-link :to="{path:'/order/recovery',query:{}}">上门回收
          </router-link>
        </li>
        <!--<li>-->
          <!--<span>新用户优惠劵</span>-->
          <!--<a href="javascript:;" class="number-color">￥300</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<span>优惠劵</span>-->
          <!--<a href="javascript:;" class="right-arrow popip-discount-btn">3张可用</a>-->
        <!--</li>-->
        <!--<li>-->
          <!--<span>换机专享优惠</span>-->
          <!--<a href="javascript:;" class="right-arrow">6张可用</a>-->
        <!--</li>-->
      </ul>
      <!--<div class="rule-p">-->
        <!--<p><span>优惠规则</span><i></i></p>-->
      <!--</div>-->
    </div>

    <div class="footer-appraisal">
      <span>合计：<strong><b>￥</b> <em class="aggregate-amount">{{sData.sumNewPrice - sData.sumOldPrice}}</em></strong></span>
      <a href="javascript:;" title="订单提交">订单提交</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { queryReplacementCat } from 'api/order'
  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
        newTile: this.$route.query.model == 'new'?'购买新机':'新机换购',
        data: {newGoods:[{imgs:[]}],oldGoods:[{imgs:[]}]},

        sData: {
          sumNewPrice: 0,
          sumOldPrice: 0,
        }
      }
    },
    created() {
      this.getData();
    },
    methods: {
      getData() {
        queryReplacementCat({ids:this.$route.query.ids}).then(response => {
          if (response.code === 200) {
            this.data = response.data
            this.data.newGoods.forEach(obj => {
              this.sData.sumNewPrice = parseFloat(obj.bllPrice) + parseFloat(this.sData.sumNewPrice)
            })
            this.data.oldGoods.forEach(obj => {
              this.sData.sumOldPrice = parseFloat(obj.bllPrice) + parseFloat(this.sData.sumOldPrice)
            })
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
  @import "orderSure.styl";
</style>
