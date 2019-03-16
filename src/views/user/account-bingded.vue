<template>
  <div class="account-bingding" ref="account-bingding">
    <v-header title="绑定账号"></v-header>
    <div class="account-binding">
      <div class="tips-icon-img">
        <dl>
          <dt><img src="/static/image/ico_binding_img.png"></dt>
        </dl>
      </div>
      <div class="account-form">
        <p style="margin:0 auto;width:200px;" >已绑定账号：{{phone}}</p>
      </div>
      <div class="clause-and-binding">
        <div class="binding binding-btn">
          <router-link class="bind-on" :to="{path:'/user/accountBingDing',query:{}}">更换绑定</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryUserinfos } from 'api/system'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        openId: '',
        phone: '',
        temp:{
          openId: ''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
      this.getList();
    },
    methods: {
      getList(){
        this.temp.openId = this.openId
        queryUserinfos({openId:this.openId}).then(response => {
          if (response.code === 200) {
            if(response.data.items != undefined){
              if(response.data.items[0].phone !== null ){
                 this.phone = response.data.items[0].phone.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
              }else{
                this.$router.push({path:'/user/accountBingDing'})
              }
            }else{
              Toast({
                message: '用户数据异常，请联系管理员！',
                position: 'bottom',
                duration: 1000
              });
            }
          }
        }).catch(() => {
        })
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "account-bingded.styl";
</style>
