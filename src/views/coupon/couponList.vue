<template>
  <div class="couponList" ref="couponList">
    <v-header title="优惠券"></v-header>
    <div class="preference-box">
      <ul>
        <li v-for="item in list" class="coiling-01" >
          <dl @click="check(item)">
            <dt>
              <strong><i>￥</i>{{item.price}}</strong>
              <span>{{item.typeName}}</span>
            </dt>
            <dd>
              <h4>{{item.title}}</h4>
              <strong>{{item.content}}</strong>
              <span>{{item.beginTime}} - {{item.endTime}}</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div class="check-pref">
        <a @click="myCoupon" href="javascript:;" title="查看我的优惠券">查看我的优惠券</a>
      </div>
      <div class="receive-pref">
        <a href="javascript:;" title="领取优惠券" @click="getCoupon">领取优惠券</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryCouponList, getCoupon } from 'api/coupon'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openId: '',
        list: null,
        checks: null
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    methods: {
      getList() {
        queryCouponList({status:'01'}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              this.list = response.data.items
            }
          }
        }).catch(() => {
        })
      },
      check(item) {
        $('.preference-box').on('click', 'li', function(event) {
          $(this).addClass('current').siblings().removeClass('current');
        });
        this.checks = item
      },
      getCoupon(){
        this.checks.openId = this.openId
        getCoupon(this.checks).then(response => {
          if (response.code === 200) {
            Toast({
              message: '领取成功！',
              position: 'bottom',
              duration: 1000
            });
            setTimeout(() => {
              this.$router.push({path: '/home', query: {}})
            }, 1000)
          }
          if(response.code === 501){
            Toast({
              message: '您已领取过该优惠券！',
              position: 'bottom',
              duration: 1000
            });
          }
          if(response.code === 502){
            Toast({
              message: '无此优惠券！',
              position: 'bottom',
              duration: 1000
            });
          }
        }).catch(() => {
        })
      },
      myCoupon(){
        this.$router.push({path: '/coupon/myCoupon', query: {}})
      }    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "couponList.styl";
</style>
