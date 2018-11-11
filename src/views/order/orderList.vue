<template>
  <div class="encyclopedias" ref="encyclopedias">
    <v-header title="订单"></v-header>
    <div class="order-all">
      <div class="screening-box">
        <ul ref="ul">
          <li class="select" @click="qh('ALL')" ref="ALL"><a href="javascript:;">全部</a></li>
          <li @click="qh('DFK',{payStatus:'01'})" ref="DFK"><a href="javascript:;">待付款</a></li>
          <li @click="qh('DJY',{checkStatus:'01',model:'02'})" ref="DJY"><a href="javascript:;">待检验</a></li>
          <li @click="qh('DSXJ',{deliveryStatus:'01',model:'01'})" ref="DSXJ"><a href="javascript:;">待收新机</a></li>
          <li @click="qh('DSJJ',{deliveryStatus:'01',model:'02'})" ref="DSJJ"><a href="javascript:;">待收旧机</a></li>

          <li @click="qh('DSK',{checkStatus:'02',model:'02'})" ref="DSK"><a href="javascript:;">待收款</a></li>

          <li @click="qh('DPL',{deliveryStatus:'04',model:'01'})" ref="DPL"><a href="javascript:;">待评价</a></li>
        </ul>
      </div>
      <div v-if="data.length > 0">
        <div class="order-main">
          <div v-for="(item1,index1) in data" class="order-tab-box order-show" title="全部">
            <div class="calculation-main" title="换购明细">
              <div class="big-title">
                <i></i>
                <span>{{item1|orderType}}</span>
                <strong>{{item1|payStatus}}</strong>
              </div>
              <div class="c-des-list" v-if="item1.oldOrder.item.length > 0 && item1.oldOrder.item[0].id != null">
                <h3>旧机估价</h3>
                <ul v-for="(item2,index2) in item1.oldOrder.item">
                  <li @click="cellClick(item2)" >
                    <div class="li-left-img">
                      <img :src="item2.imgs[0].url">
                    </div>
                    <div class="li-right-inf">
                      <h4><span>{{item2.goodsName}}</span></h4>
                      <h5>{{item2.parameterStr}}</h5>
                      <h6>估价：<span>￥{{item2.guJia}}</span></h6>
                      <div>
                        <p>最终回收价以工程师检测为准</p>
                        <span>x 1</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="subtotal-box">
                  共<span>{{item1.oldOrder.item.length}}</span>件商品&nbsp;&nbsp;小计：<strong>￥{{item1.oldOrder.sum}}</strong>
                </div>
              </div>
            </div>
            <div class="calculation-main" title="换购明细">
              <div class="c-des-list" v-if="item1.newOrder.item.length > 0 && item1.newOrder.item[0].id != null">
                  <div class="line" v-if="item1.oldOrder.item.length > 0"></div>
                  <h3 v-if="item1.oldOrder.item.length > 0">新机换购</h3>
                  <h3 v-else>购买新机</h3>
                  <ul v-for="(item2,index2) in item1.newOrder.item">
                    <li @click="cellClick(item2)">
                      <div class="li-left-img">
                        <img :src="item2.imgs[0].url">
                      </div>
                      <div class="li-right-inf">
                        <h4><span>{{item2.goodsName}}</span></h4>
                        <h5>{{item2.parameterStr}}</h5>
                        <h6>估价：<span>￥{{item2.guJia}}</span></h6>
                        <i class="i-img"></i>
                        <div>
                          <p>价格<b class="through">￥9600.00</b></p>
                          <span>x 1</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div class="subtotal-box">
                    共<span>{{item1.newOrder.item.length}}</span>件商品&nbsp;&nbsp;小计：<strong>￥{{item1.newOrder.sum}}</strong>
                  </div>
                  <div v-if="item1.newOrder.item.length > 0 && item1.oldOrder.item.length > 0" class="subtotal-box">
                    合计：<strong class="color-red">￥{{item1.price}}</strong>
                  </div>
              </div>
            </div>
            <div  class="btn-box">
              <a v-if="navbar=='ALL'?(item1.type != '02' && item1.payStatus == '01' && item1.price >0):btn.fk" class="payment-btn" href="javascript:;" @click="fkcilck(item1,index1)" title="付款">付款</a>
              <a v-if="navbar=='ALL'?(item1.orderStatus != '01' && item1.payStatus == '01'):btn.qxfk" class="cancel-btn" href="javascript:;" @click="qxcilck(item1,index1)" title="取消订单">取消订单</a>
              <a v-if="navbar=='ALL'?((item1.deliveryStatus == '01' || item1.deliveryStatus == '03') && item1.payStatus == '02' && item1.type == '01'):btn.qrsh" class="payment-btn" href="javascript:;" @click="qrshcilck(item1,index1)" title="确认收货">确认收货</a>
              <a v-if="navbar=='ALL'?(item1.type != '01' && item1.price < 0 && item1.checkStatus == true && item1.orderStatus != '01'):btn.qrsk" class="payment-btn" href="javascript:;" @click="skcilck(item1,index1)" title="确认收款">确认收款</a>
              <a v-if="navbar=='ALL'?(item1.type == '01' && item1.deliveryStatus == '03' && item1.orderStatus == '01'):btn.pl" class="payment-btn" href="javascript:;" @click="pjcilck(item1,index1)" title="评价">评价</a>
              <a v-if="navbar=='ALL'?(item1.payStatus == '02' && item1.orderStatus != '01'):btn.ckwl" class="cancel-btn" href="javascript:;" @click="ckwlcilck(item1,index1)" title="查看物流">查看物流</a>
              <a v-if="navbar=='ALL'?(item1.type != '01' && item1.checkStatus == false):btn.txjy" class="payment-btn" href="javascript:;" @click="txjccilck(item1,index1)" title="提醒检验">提醒检验</a>
            </div>
            <div class="line" v-if="index1 != 0"></div>
          </div>
        </div>
        <!--<div v-if="navbar == 'ALL'" class="footer-payment">-->
          <!--<span>合计：<strong><b>￥</b> <em class="aggregate-amount">0</em></strong></span>-->
          <!--<a href="javascript:;" title="合并付款">合并付款</a>-->
        <!--</div>-->
      </div>

      <div style="height: 100%;" v-else>
        <div class="order-null">
          <img src="/static/image/shopping_trolley.png">
          <p>什么都没有，快去下单吧！</p>
          <a @click="gujia">去估价吧</a>
        </div>
      </div>
    </div>
    <div class="popup-choice-wrap" title="是否删除弹窗">
      <div class="choice-box">
        <p>确定取消订单吗？</p>
        <div>
          <a class="cancel-btn" href="javascript:;" title="取消">取消</a>
          <a class="confirm-btn" href="javascript:;" title="确定">确定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryOrderList, updateOrder } from 'api/order'
  import { payStatus,orderType } from '../../utils/filter'
  import { pay } from 'api/wx'
  import { Toast } from 'mint-ui'

  export default {
    inject: ['reload'],
    data() {
      return {
        selected: '1',
        data: [],
        navbar: 'ALL',
        types: '',
        openId: '',
        temp:{
          id: '',
          type: '',
          orderId: '',
          openId: '',
          goodsName: '',
          price: ''
        },
        btn: {
          fk:false,
          qxfk:false,
          qrsh:false,
          qrsk:false,
          ckwl:false,
          pl:false,
          txjy:false
        },
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
      payStatus,
      orderType
    },
    methods: {
      getList() {
        this.query.openId = this.openId
        queryOrderList(this.query).then(response => {
          if (response.code === 200) {
            this.data = response.data.items;
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
          this.showBtn(key)
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
      showBtn(key) {
        switch (key) {
          case 'ALL' :
            this.btn.fk = true
            this.btn.qxfk = true
            this.btn.qrsh = true
            this.btn.qrsk = true
            this.btn.ckwl = true
            this.btn.pl = true
            this.btn.txjy = true
            return;
          case 'DFK' :
            this.btn.fk = true
            this.btn.qxfk = true
            this.btn.qrsh = false
            this.btn.qrsk = false
            this.btn.ckwl = false
            this.btn.pl = false
            this.btn.txjy = false
            return;
          case 'DJY' :
            this.btn.fk = false
            this.btn.qxfk = false
            this.btn.qrsh = false
            this.btn.qrsk = false
            this.btn.ckwl = false
            this.btn.pl = false
            this.btn.txjy = true
            return;
          case 'DSXJ' :
            this.btn.fk = false
            this.btn.qxfk = false
            this.btn.qrsh = true
            this.btn.qrsk = false
            this.btn.ckwl = true
            this.btn.pl = false
            this.btn.txjy = false
            return;
          case 'DSJJ' :
            this.btn.fk = false
            this.btn.qxfk = false
            this.btn.qrsh = true
            this.btn.qrsk = false
            this.btn.ckwl = true
            this.btn.pl = false
            this.btn.txjy = false
            return;
          case 'DSK' :
            this.btn.fk = false
            this.btn.qxfk = false
            this.btn.qrsh = false
            this.btn.qrsk = true
            this.btn.ckwl = false
            this.btn.pl = false
            this.btn.txjy = false
            return;
          case 'DPL' :
            this.btn.fk = false
            this.btn.qxfk = false
            this.btn.qrsh = false
            this.btn.qrsk = false
            this.btn.ckwl = true
            this.btn.pl = true
            this.btn.txjy = false
            return;
        }
      },
      gujia() {
        this.$router.push("/screening?model=02")
      },
      fkcilck(item,index) {
        switch (item.type) {
          case '01' :
            this.types = '购买新机：'
          case '02' :
            this.types = '出售旧机：'
          case '03' :
            this.types = '换机订单：'
        }
        // this.temp.openId = this.openId
        this.temp.openId = this.openId
        this.temp.orderId = item.number
        this.temp.price = item.sum
        this.temp.goodsName = this.types + item.goodsName
        pay(this.temp).then(response => {
          this.weixinPay(response.data)
          setTimeout(() => {
            this.reload()
          }, 1000)
        }).catch(() => {
        })
      },
      qrshcilck(item,index){
        var res = {
          id: item.id,
          openId: this.openId,
          orderstatus:'01',
          deliverystatus:'04',
          status: '05'
        }
        updateOrder(res).then(response => {
          Toast({
            message: '确认收货成功！',
            position: 'bottom',
            duration: 5000
          });
          setTimeout(() => {
            this.reload()
          }, 1000)
        }).catch(() => {
        })
      },
      qxcilck(item,index) {
        $('.popup-choice-wrap').fadeIn();
        $('.popup-choice-wrap .cancel-btn').click(function() {
          $('.popup-choice-wrap').fadeOut();
          $('.model-box').removeClass('m-swipeleft');
        });
        $('.popup-choice-wrap .confirm-btn').click(function() {
          this.temp.id = item.id
          this.temp.paystatus = '03'
          this.temp.openId = this.openId
          this.temp.type = '03'
          updateOrder(this.temp).then(response => {
            Toast({
              message: '订单取消成功！',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              this.reload()
            }, 1000)
          }).catch(() => {
          })
        })
      },
      ckwlcilck(item,index){
        this.$router.push({path: 'logistics', query: {id:item.id}})
      },
      txjccilck(item,index){
        Toast({
          message: '已提醒工作人员上门检测！',
          position: 'bottom',
          duration: 5000
        });
      },
      cellClick(item) {
        this.$router.push({path: 'orderDetail', query: {id:item.id}})
      },
      skcilck(item,index){
        var res = {
          id: item.id,
          openId: this.openId,
          orderstatus:'01',
          deliverystatus:'03',
          status: '04'
        }
        updateOrder(res).then(response => {
          Toast({
            message: '确认收款成功！',
            position: 'bottom',
            duration: 5000
          });
          setTimeout(() => {
            this.reload()
          }, 1000)
        }).catch(() => {
        })
      },
      pjcilck(item,index){
        this.$router.push({path: '/order/evaluate', query: {item:item.newOrder}})
      },
      //调用微信支付
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
  @import "orderList.styl";
</style>
