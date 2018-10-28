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
        <li v-if="data.oldGoods.length >0" >
          <span >回收方式</span>
            <router-link :to="{path:'/order/recovery',query:{ids:this.$route.query.ids}}" >{{list.types}}
            </router-link>
        </li>
        <li v-if="xcList.length >0">
          <span>{{xcList[0].typeName}}</span>
          <a v-if="couponPrice != 0" @click="queryCoupon('XC')" href="javascript:;" class="number-color">￥{{couponPrice}}</a>
          <a v-else @click="queryCoupon('XC')" href="javascript:;" class="number-color">{{xcList.length}}张可用</a>
        </li>
        <li v-if="pcList.length >0">
          <span>{{pcList[0].typeName}}</span>
          <a v-if="ptCouponPrice != 0" @click="queryCoupon('PC')" href="javascript:;" class="right-arrow popip-discount-btn">{{ptCouponPrice}}</a>
          <a v-else @click="queryCoupon('PC')" href="javascript:;" class="right-arrow popip-discount-btn">{{pcList.length}}张可用</a>
        </li>
        <li v-if="hcList.length >0">
          <span>{{hcList[0].typeName}}</span>
          <a v-if="hjCouponPrice != 0" @click="queryCoupon(HC)" href="javascript:;" class="right-arrow">{{hjCouponPrice}}</a>
          <a v-else @click="queryCoupon(HC)" href="javascript:;" class="right-arrow">{{hcList.length}}张可用</a>
        </li>
      </ul>
      <!--<div class="rule-p">-->
        <!--<p><span>优惠规则</span><i></i></p>-->
      <!--</div>-->
    </div>

    <div class="footer-appraisal">
      <span>合计：<strong><b>￥</b> <em v-model="price" class="aggregate-amount">{{sData.sumNewPrice - sData.sumOldPrice - couponPrice -ptCouponPrice - hjCouponPrice}}</em></strong></span>
      <a href="javascript:;" title="订单提交" @click="submit">订单提交</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {  instertOrder } from 'api/order'
  import { queryAddress } from 'api/address'
  import { queryReplacementCar, queryrecoveryList } from 'api/goods'
  import { queryCouponUser } from 'api/coupon'
  import { pay } from 'api/wx'
  import { queryUserinfos } from 'api/system'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        newTile: this.$route.query.model == 'new'?'购买新机':'新机换购',
        data: {newGoods:[{imgs:[]}],oldGoods:[{imgs:[]}]},
        list: {types: ''},
        wx: null,
        xcList: [],
        pcList: [],
        hcList: [],
        openid: '',
        couponPrice: 0,
        ptCouponPrice: 0,
        hjCouponPrice: 0,
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
      this.list.types = this.$route.query.check
      if(this.$route.query.type === 'XC'){
        this.couponPrice = this.$route.query.price
      }else if(this.$route.query.type === 'PC'){
        this.ptCouponPrice = this.$route.query.price
      }else if(this.$route.query.type === 'HC'){
        this.hjCouponPrice = this.$route.query.price
      }
      this.getData();
      this.getList();
      this.getCoupon();
    },
    methods: {
      getList() {
        queryrecoveryList({openId: this.openid}).then(response => {
          if (response.code === 200) {
            if(this.$route.query.check !== undefined){
              this.list.types = this.$route.query.check
            }else{
              this.list = response.data.items[0]
            }
          }
        }).catch(() => {
        })
        queryAddress({openId:this.openid,isVisit:'Y'}).then(response => {
          if (response.code === 200) {
            this.address = response.data.items
          }
        }).catch(() => {
        })
      },
      getData() {
        var tar = this
        queryReplacementCar({ids:this.$route.query.ids}).then(response => {
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
      getCoupon(){
        queryCouponUser({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              response.data.items .forEach((value,index) => {
                switch (value.type) {
                  case 'XC' :
                    this.xcList.push(value)
                    return;
                  case 'PC' :
                    this.pcList.push(value)
                    return;
                  case 'HC' :
                    this.hcList.push(value)
                    return;
                }
              })
            }
          }
        }).catch(() => {
        })
      },
      queryCoupon(item){
        this.$router.push({path: '/coupon/getCoupon', query: {ids:this.$route.query.ids,item:item}})
      },
      submit() {
        if(this.address.length > 0){
          queryUserinfos({openId:this.openid}).then(response => {
            if (response.code === 200) {
              if(response.data.items[0].phone == null || response.data.items[0].phone == '' ){
                this.$router.push({path: '/user/accountBingDing', query: {id:this.openid}})
              }
            }
          }).catch(() => {
          })
          this.data.price = this.sData.sumNewPrice - this.sData.sumOldPrice - this.couponPrice - this.ptCouponPrice - this.hjCouponPrice
          this.data.openId = this.openid
          this.data.type = this.list.types
          this.data.address = this.address
          if(this.data.oldGoods.length === 0){
            this.$router.push({path: 'payment', query: {item:this.data}})
          }else{
            instertOrder(this.data).then(response => {
              this.data.orderId = response.data.items[0].orderId
              setTimeout(() => {
                this.$router.push({path: 'visitRecovery', query: {item:this.data}})
              }, 1000)
            }).catch(() => {
            })
          }
        }else{
          Toast({
            message: '请填写收货/上门地址！',
            position: 'bottom',
            duration: 5000
          });
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
  @import "orderSure.styl";
</style>
