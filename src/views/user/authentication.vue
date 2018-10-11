<template>
  <div class="authentication" ref="authentication">
    <v-header title="身份认证"></v-header>
    <div class="authentication">
      <div class="authentication-box">
        <div>
          <img src="/static/image/authentication_img_01.png" title="背面">
        </div>
        <div>
          <img src="/static/image/authentication_img_02.png" title="正面">
        </div>
      </div>
      <div class="upload-btn">
        <a href="javascript:;" title="立即上传">立即上传</a>
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
  @import "authentication.styl";
</style>
