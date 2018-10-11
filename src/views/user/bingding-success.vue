<template>
  <div class="bingding-success" ref="bingding-success">
    <v-header title="绑定成功"></v-header>
    <div class="binding-success">
      <div class="tips-icon-img">
        <dl>
          <dt><img src="/static/image/ico_binding_img.png"></dt>
          <dd>
            <h1>绑定成功</h1>
            <h5>微信账号与手机号绑定成功！</h5>
            <h4>您可以直接使用手机号登录小换</h4>
          </dd>
        </dl>
      </div>
      <div class="success-btn">
        <a href="javascript:;" title="确定">确定</a>
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
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "bingding-success.styl";
</style>
