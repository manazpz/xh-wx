<template>
  <div class="user" ref="user">
    <v-header title="用户管理"></v-header>
    <div class="account-management">
      <div class="top-account-inf">
        <dl>
          <dt>
            <img src="/static/image/pic_img.png" title="账号头像">
          </dt>
          <dd class="formal">
            <span>Acid</span>
          </dd>
        </dl>
      </div>
      <div class="account-list">
        <ul>
          <li><a href="javascript:;" title="绑定手机号码">绑定手机号码</a></li>
          <li><a href="javascript:;" title="收货地址管理">收货地址管理</a></li>
          <li><a href="javascript:;" @click="jump('/user/encyclopedias')" title="账号百科">账号百科</a></li>
          <li><a href="javascript:;" title="退出登陆">退出登陆</a></li>
        </ul>
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
      jump(view) {
        this.$router.push({path:view})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "user.styl";
</style>
