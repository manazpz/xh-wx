<template>
  <div class="orderDetail" ref="orderDetail">
    <v-header title="订单详情"></v-header>
    <div class="order-waiting-payment">
    <div class="top-process-box">
      <div class="three-process-box process-2">
        <div>
          <strong>1</strong>
          <b>等待上门</b>
        </div>
        <span>...........</span>
        <div>
          <strong>2</strong>
          <b>验机确认</b>
        </div>
        <span>...........</span>
        <div>
          <strong>3</strong>
          <b>发送货款</b>
        </div>
      </div>
    </div>

    <div class="top-address-inf">
      <div class="address-inf-box">
        <div  class="div-des" title="已选择收货地址时">
          <h5 v-if="model.recovery != null">{{model.recovery}}</h5>
          <h5 v-else >收货地址</h5>
          <p>
            <span>{{model.address.name}}</span>
            <strong>{{model.address.phone}}</strong>
          </p>
          <p>
            <span>{{model.address.areaString}}{{model.address.streetString}}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="calculation-main" title="换购明细">
      <div class="c-des-list">
        <div v-if="model.newOrder.item.length > 0 && model.newOrder.item[0].id != null">
          <h3>新机信息<i></i></h3>
          <ul>
            <li v-for="(item1,index1) in model.newOrder.item">
              <div class="li-left-img">
                <img :src="item1.imgs[0].url" title="产品">
              </div>
              <div class="li-right-inf">
                <h4><span>{{item1.goodsName}} 换购价</span></h4>
                <h5>{{item1.parameterStr}}</h5>
                <h6></h6>
                <i class="i-img"></i>
                <div>
                  <p>价格￥9600.00<b></b></p>
                  <span>x 1</span>
                </div>
              </div>
              <div class="subtotal-li-box">
                <em>共{{model.newOrder.item.length}}件商品</em>小计：
                <b>￥{{model.newOrder.sum}}</b>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="model.oldOrder.item.length > 0 && model.oldOrder.item[0].id != null">
          <h3>旧机信息<i></i></h3>
          <ul>
            <li v-for="(item2,index2) in model.oldOrder.item">
              <div class="li-left-img">
                <img :src="item2.imgs[0].url" title="产品">
              </div>
              <div class="li-right-inf">
                <h4><span>{{item2.goodsName}} 换购价</span></h4>
                <h5>{{item2.parameterStr}}</h5>
                <h6></h6>
                <i class="i-img"></i>
                <div>
                  <p>价格￥9600.00<b></b></p>
                  <span>x 1</span>
                </div>
              </div>
              <div class="subtotal-li-box">
                <em>共{{model.oldOrder.item.length}}件商品</em>小计：
                <b>￥{{model.oldOrder.sum}}</b>
              </div>
            </li>
          </ul>
        </div>

        <!--<div class="small-p clearfix">-->
          <!--<p>-->
            <!--<span>新用户优惠劵</span>-->
            <!--<strong>￥100</strong>-->
          <!--</p>-->
          <!--<p>-->
            <!--<span>运费</span>-->
            <!--<strong>￥0</strong>-->
          <!--</p>-->
        <!--</div>-->
        <div class="subtotal-box">
          <em>订单总价</em>
          <b>￥{{model.sum}}</b>
        </div>
      </div>
    </div>

    <!-- 		<div class="details-inf">
                <ul>
                    <li>
                        <span>质检报告</span>
                        <a class="color-green" href="javascript:;">检测中</a>
                    </li>
                </ul>
            </div> -->
    <div v-for="(item4,index4) in parameter" class="quality-testing-inf">
      <h3  class="title-tab">
        <span  v-if="index4 == 0" class="select">质检报告{{index4+1}}</span>
        <span v-else>质检报告{{index4+1}}</span>
      </h3>
      <div class="option-list">
        <div class="show">
          <h4>{{model.oldOrder.item[index4].goodsName}}</h4>
          <ul>
            <li v-for="(item6,index6) in item4">
              <span>{{item6.name}}</span>
              <em>{{item6.spec[0].spec_value_name}}</em>
              <strong v-if="checks[index4][index6].spec[0].spec_sort == item6.spec[0].spec_sort" class="identical">一致</strong>
              <strong v-else class="identical">不一致<i></i></strong>
            </li>
            <li>
              <span>旧机检测结果：</span>
              <!-- <em>通话不正常</em> -->
              <strong class="normal">￥2200.00</strong>
            </li>
            <li>
              <span>需补差价：</span>
              <!-- <em>通话不正常</em> -->
              <strong class="atypism">￥200.00</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>



    <div class="copy-and-time">
      <p>订单编号：
        <textarea readonly="readonly">{{model.number}}</textarea>
        <button class="copy-btn" href="javascript:;"  data-clipboard-target="#bar">复制</button>
      </p>
      <p>创建时间：<span>{{model.createTime}}</span></p>
      <p>发货时间：<span>2018.07.08  12:20:16</span></p>
      <p>收款时间：<span>2018.07.09  22:10:26</span></p>
    </div>

    <div class="footer-payment">
      <!-- <a class="revise-btn" href="javascript:;" title="修改地址">修改地址</a> -->
      <a class="payment-btn" href="javascript:;" title="确认付款">确认付款</a>
      <a class="cancel-btn" href="javascript:;" title="查看物流">查看物流</a>
    </div>
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryOrderList } from 'api/order'
  import { amslerList } from 'api/yanji'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openId: '',
        model: '',
        amsler: [],
        parameter: [],
        checks: [],
        checkPrice: [],
        query: {
          openId:'oaCWN0ns9o_IjsXbeRQtAqIeHhhg',
          id: ''
        },
        temp: {
          orderId: ''
        }
      }
    },
    created() {
      this.getList();
      this.openId = window.localStorage.getItem("openId")
    },
    methods: {
      getList() {
        this.query.id = this.$route.query.id
        queryOrderList(this.query).then(response => {
          if (response.code === 200) {
            this.model = response.data.items[0];
            this.model.createTime = this.model.createTime.split(':000')[0]
            this.model.oldOrder.item.forEach((value,index) => {
              this.checks.push(JSON.parse(value.parameter))
              var tr = this
              debugger
            })
          }
        }).catch(() => {
        })
        this.temp.orderId = this.$route.query.id
        amslerList(this.temp).then(response => {
          if (response.code === 200) {
            this.amsler = response.data.items
            this.amsler.forEach((value,index) => {
              debugger
              this.parameter.push(JSON.parse(value.parameter))
              // var price = 0
              // this.parameter[index].forEach((value1,index1) => {
              //   price  += parseFloat(value1.spec[0].correntPrice)
              // })
              // this.checkPrice.push(Math.abs(price))
            })
          }
        }).catch(() => {
        })
      },
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "orderDetail.styl";
</style>
