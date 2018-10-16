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
    <div class="quality-testing-inf">
      <h3 class="title-tab">
        <span class="select">质检报告1</span>
        <span>质检报告2</span>
      </h3>
      <div class="option-list">
        <div class="show">
          <h4>苹果 ipone 7 plus</h4>
          <ul>
            <li>
              <span>制式</span>
              <em>大陆全网通</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>容量</span>
              <em>256G</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>功能</span>
              <em>其他</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>屏幕与显示</span>
              <em>显示正常</em>
              <strong class="atypism">不一致<i></i></strong>
            </li>
            <li>
              <span>锁机</span>
              <em>iCloud已注销</em>
              <strong class="atypism">不一致<i></i></strong>
            </li>
            <li>
              <span>相关实情描述</span>
              <em>通话不正常</em>
              <strong class="atypism">不一致<i></i></strong>
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
        <div>
          <h4>苹果 ipone 10 plus</h4>
          <ul>
            <li>
              <span>制式</span>
              <em>大陆全网通</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>容量</span>
              <em>256G</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>功能</span>
              <em>其他</em>
              <strong class="identical">一致</strong>
            </li>
            <li>
              <span>屏幕与显示</span>
              <em>显示正常</em>
              <strong class="atypism">不一致<i></i></strong>
            </li>
            <li>
              <span>锁机</span>
              <em>iCloud已注销</em>
              <strong class="atypism">不一致<i></i></strong>
            </li>
            <li>
              <span>相关实情描述</span>
              <em>通话不正常</em>
              <strong class="atypism">不一致<i></i></strong>
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
        <textarea name="" id="bar" readonly="readonly">76232424998</textarea>
        <button class="copy-btn" href="javascript:;"  data-clipboard-target="#bar">复制</button>
      </p>
      <p>创建时间：<span>2018.07.04  16:28:19</span></p>
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
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openId: '',
        model: '',
        check: [],
        query: {
          openId:'oaCWN0ns9o_IjsXbeRQtAqIeHhhg',
          id: ''
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
            debugger
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
