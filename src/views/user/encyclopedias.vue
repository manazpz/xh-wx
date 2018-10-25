<template>
  <div class="encyclopedias" ref="encyclopedias">
    <v-header title="用户管理"></v-header>
    <div v-if="info.phone === null" class="account-encyclopedias">
      <div class="acc-enc-main">
        <div class="enc-tip-01">
          <h1>账号说明</h1>
          <p>当您进入到小换平台后，小换平台会为您准备一个临时账号，可用于您在平台上进行旧机估价、逛集市以及收藏新机等操作。</p>
        </div>
        <div class="enc-tip-02">
          <h2>是否可以使用该账号交易？</h2>
          <p>不可以的，因为交易需要涉及到您个人的信息以及地址信息，所以是需要您进行账号绑定。</p>
        </div>
        <div class="enc-tip-02">
          <h2>如何绑定账号呢？</h2>
          <p>绑定的办法有两种：1.您可以在“我的”页面里点击头像，进入“账号管理”页面，点击“绑定手机号”选项进行绑定。2.您可直接进行选购商品或进行换购新机的交易，当交易进行到确认订单时，会引导您进行账号绑定。</p>
        </div>
      </div>
    </div>

    <div v-else class="drop-out">
      <div class="top-tip-p">
        <p>登陆小换账号后，将关联至您的微信账号，可通过微信快捷登陆小换平台并交易，也可享受小换平台的优惠。</p>
      </div>
      <div class="drop-main">
        <h1>退出登陆后将：</h1>
        <div class="drop-con">
          <div>
            <p>解除小换平台账号与微信账号的关联，无法直接完成您在平台的交易。</p>
            <p>不可享受会员权益，如新人优惠券和每周优惠券等。</p>
            <p>无法查看您的订单和物流的具体信息。</p>
            <p>不可使用以下资产：新人优惠券 <strong>1</strong> 张，每周优惠券 <strong>1</strong> 张。</p>
          </div>
          <div class="tip-p">
            <span>————————— 确定要退出登陆？ —————————</span>
          </div>
          <div class="btn-box">
            <a class="maintain-btn" href="javascript:;" title="保持登陆">保持登陆</a>
            <a @click="close" class="quit-btn" href="javascript:;" title="退出登陆">退出登陆</a>
          </div>
        </div>

        <div>
          <a href="javascript:;" title=""></a>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryCustom } from 'api/system'

  export default {
    data() {
      return {
        openId: '',
        info: {}
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        queryCustom({openId:this.openId}).then(response => {
          if (response.code === 200) {
            this.info = response.data.items[0]
          }
        }).catch(() => {
        })
      },
      close() {
        window.opener = null
        window.open('about:blank', '_self')
        window.close();
      }

    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "encyclopedias.styl";
</style>
