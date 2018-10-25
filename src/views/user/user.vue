<template>
  <div class="user" ref="user">
    <v-header title="用户管理"></v-header>
    <div class="account-management">
      <div class="top-account-inf">
        <dl>
          <dt>
            <!--<img src="/static/image/pic_img.png" title="账号头像">-->
            <img :src="list.headPortrait">
          </dt>
          <dd class="formal">
            <span>{{list.nickName}}</span>
          </dd>
          <!--<mt-button size="small" plain type="danger" @click="jump('/user/authentication')">未认证</mt-button>-->
        </dl>
      </div>
      <div class="account-list">
        <ul>
          <!--<li><a href="javascript:;" title="绑定手机号码">绑定手机号码</a></li>-->
          <li><router-link :to="{path:'/user/accountBingDing',query:{}}">
            绑定手机号码
          </router-link></li>
          <li><router-link :to="{path:'/manaAddress',query:{}}">
            收货地址管理
          </router-link></li>
          <!--<li><a href="javascript:;" @click="jump('/user/encyclopedias')" title="账号百科">账号百科</a></li>-->
          <li><a href="javascript:;"  title="账号百科">账号百科</a></li>
          <li><router-link :to="{path:'/user/encyclopedias',query:{}}">
            退出登陆
          </router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryUserinfos } from 'api/system'

  export default {
    data() {
      return {
        openId: '',
        list: null
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    methods: {
      getList() {
        queryUserinfos({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              this.list = response.data.items[0]
            }
          }
        }).catch(() => {
        })
      },
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
