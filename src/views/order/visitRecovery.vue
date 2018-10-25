<template>
  <div class="visitRecovery" ref="visitRecovery">
    <v-header v-if="list.type == '上门回收'" title="上门回收"></v-header>
    <v-header v-if="list.type == '门店回收'" title="门店回收"></v-header>
      <div class="top-process-box">
        <h1>
          <img src="/static/image/coupons_button_tick_press.png">
          <span>提交成功</span>
          <router-link :to="{path:'/orderDetail',query:{id:list.orderId}}">
            查看订单
          </router-link>
        </h1>
        <div class="three-process-box process-1">
          <div>
            <strong>1</strong>
            <b v-if="list.type == '上门回收'">等待上门</b>
            <b v-if="list.type == '门店回收'">门店联系</b>
          </div>
          <span>...........</span>
          <div>
            <strong>2</strong>
            <b>验机确认</b>
          </div>
          <span>...........</span>
          <div>
            <strong>3</strong>
            <b>发放新机</b>
          </div>
        </div>

      </div>
      <div class="explain-div-1">
        <h3 v-if="list.type == '上门回收'">请保持电话通畅，工作人员会联系您</h3>
        <h3 v-if="list.type == '门店回收'">请到门店进行会说操作</h3>
        <p><span>{{address.name}}</span><strong>{{address.phone}}</strong></p>
        <p>{{address.areaString}}{{address.streetString}}</p>
      </div>
      <div class="explain-div-1">
        <h2>门店回收期前您需要</h2>
        <h3>清理数据/解锁开机密码</h3>
        <p>请备份手机内重要的数据，解除开机密码并注销账户</p>
      </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { recoveryList, insertRecoveryUser } from 'api/goods'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openid: '',
        list: [],
        address: []
      }
    },
    created() {
      this.list = this.$route.query.item
      this.address = this.list.address[0]
    },
    methods: {

    },
    //注册组件
    components: {
      VHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "visitRecovery.styl";
</style>
