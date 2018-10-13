<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="确认订单"></v-header>
    <div class="top-address-inf">
      <div class="address-inf-box">
        <router-link v-if="address.length > 0" class="div-des" title="已经收货地址时" :to="{path:'/manaAddress',query:{}}">
          <p>
            <span>{{address[0].name}}</span>
            <strong>{{address[0].phone}}</strong>
          </p>
          <p>
            <span>{{address[0].areaString}}{{address[0].streetString}}</span>
          </p>
        </router-link>
        <div v-else>
          <router-link  :to="{path:'/addressEdit',query:{}}"><p class="p-null" title="未填写收货地址时">您的收货地址为空，为您的手机添加地址吧！</p>
          </router-link>
        </div>
      </div>
    </div>

    <div class="calculation-main" title="换购明细">
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
    </div>
    <div class="details-inf">
      <ul>
        <li>
          <span>售后服务</span>
          <a href="javascript:;">全国联保</a>
        </li>
        <li v-for="(item,index) in list">
          <span>回收方式</span>
          <router-link :to="{path:'/order/recovery',query:{}}">{{item.types}}
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
      <span>合计：<strong><b>￥</b> <em v-model="price" class="aggregate-amount">{{sData.sumNewPrice - sData.sumOldPrice}}</em></strong></span>
      <a href="javascript:;" title="订单提交" @click="submit">订单提交</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { queryReplacementCat, queryAddress, instertOrder } from 'api/order'
  import { queryrecoveryList } from 'api/goods'
  import { pay } from 'api/wx'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        newTile: this.$route.query.model == 'new'?'购买新机':'新机换购',
        data: {newGoods:[{imgs:[]}],oldGoods:[{imgs:[]}]},
        list: null,
        wx: null,
        openid: '',
        price: '',
        address: [],
        sData: {
          sumNewPrice: 0,
          sumOldPrice: 0,
        },
      }
    },
    created() {
      this.openid = window.localStorage.getItem("openId");
      this.getData();
      this.getList();
    },
    methods: {
      getList() {
        queryrecoveryList({openId:'123456'}).then(response => {
          if (response.code === 200) {
            if(response.data.items.length >1){
              this.list = response.data.items[0]
            }else{
              this.list = response.data.items
            }
          }
        }).catch(() => {
        })
        queryAddress({openId:'123456',isVisit:'Y'}).then(response => {
          if (response.code === 200) {
            this.address = response.data.items
          }
        }).catch(() => {
        })
      },
      getData() {
        var tar = this
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
      },
      submit() {
        this.data.price = this.sData.sumNewPrice - this.sData.sumOldPrice
        this.data.openId = this.openid
        if(this.data.oldGoods.length === 0){
          pay(this.data).then(response => {
            this.weixinPay(response.data)
          }).catch(() => {
          })
        }else{
          instertOrder(this.data).then(response => {
            Toast({
              message: '订单已提交，请等待工作人员上门验机！',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              this.$router.back(-1)
            }, 1000)
          }).catch(() => {
          })
        }
      },
      weixinPay:function(data){
        var vm= this;
        if (typeof WeixinJSBridge == "undefined"){//微信浏览器内置对象。参考微信官方文档
          if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
          }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
            document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
          }
        }else{
          vm.onBridgeReady(data);
        }
      },
      onBridgeReady:function(data){
        var  vm = this;
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest',{
            debug:true,
            "appId":data.appId,     //公众号名称，由商户传入
            "timeStamp":data.timeStamp, //时间戳，自1970年以来的秒数
            "nonceStr":data.nonceStr, //随机串
            "package":data.packAge,
            "signType":data.signType, //微信签名方式：
            "paySign":data.paySign, //微信签名
          },
          function(res){
            // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            if(res.err_msg == "get_brand_wcpay_request:ok" ){

            }else{

            }
          }
        );
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
