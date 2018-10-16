<template>
  <div class="payment" ref="payment">
    <v-header title="选择收款方式"></v-header>
    <div class="payment-method">
      <div class="payment-num">
        <h3><span>需支付：</span><strong>￥{{this.list.price}}</strong></h3>
      </div>
      <div class="method-box">
        <h4>选择付款方式</h4>
        <ul>
          <li>
            <img src="/static/image/icon_wx.png">
            <p>微信支付</p>
            <i class="i-hook"></i>
          </li>
          <!--<li>-->
            <!--<img src="/static/image/icon_zfb.png">-->
            <!--<p>支付宝支付</p>-->
            <!--<i></i>-->
          <!--</li>-->
          <!--<li>-->
            <!--<img src="/static/image/icon_yl.png">-->
            <!--<p>银联支付</p>-->
            <!--<i></i>-->
          <!--</li>-->
        </ul>
      </div>

      <div class="payment-btn">
        <a href="javascript:;" @click="pay">使用微信支付</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { pay } from 'api/wx'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        list: null
      }
    },
    created() {
      this.list = this.$route.query.item
    },
    methods: {
      pay() {
        pay(this.list).then(response => {
          this.weixinPay(response.data)
        }).catch(() => {
        })
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
  @import "payment.styl";
</style>
