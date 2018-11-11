<template>
  <div class="customService" ref="customService">
    <v-header title="意见反馈"></v-header>
    <div class="set-main-list">
      <mt-field label="意见反馈" placeholder="请输入意见反馈内容" type="textarea" rows="4" v-model="temp.content"></mt-field>
    </div>
    <div style="text-align:center">
      <mt-button @click="submit" type="danger">提交</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { insertSuggestion } from 'api/system'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        temp:{
          content: '',
          openId: ''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
    },
    methods: {
      submit(){
        this.temp.openId = this.openId
        insertSuggestion(this.temp).then(response => {
          if (response.code === 200) {
            Toast({
              message: '反馈成功！',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              this.$router.push({path: '/home', query: {}})
            }, 1000)
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
  @import "setting.styl";
</style>
