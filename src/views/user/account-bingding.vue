<template>
  <div class="account-bingding" ref="account-bingding">
    <v-header title="绑定账号"></v-header>
    <div class="account-binding">
      <div class="tips-icon-img">
        <dl>
          <dt><img src="/static/image/ico_binding_img.png"></dt>
          <dd><p>请绑定小换账号，便于下次快速登录</p></dd>
        </dl>
      </div>
      <div class="account-form">
        <form action="">
          <label>
            <span>手机号码</span>
            <input class="phone-inp" type="text" name="" value="" placeholder="输入您的手机号码" maxlength="11">
          </label>
          <label>
            <span>验证码</span>
            <input class="verification-inp" type="text" name="" value="" placeholder="输入验证码" maxlength="8">
            <div class="validate-btn">
              <a href="javascript:;">点击获取验证码</a>
            </div>
          </label>
        </form>
      </div>
      <div class="clause-and-binding">
        <div class="clause">
          <i class="i-on"></i>
          <p>我已接受《小换回收条款》及《隐私条款》</p>
        </div>
        <div class="binding binding-btn">
          <a href="javascript:;" @click="bingding">立即绑定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
      }
    },
    created() {
    },
    methods: {
      bingding() {
        this.$router.push({path:'/user/bingDingSuccess'})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "account-bingding.styl";
</style>
