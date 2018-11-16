<template>
  <div class="customService" ref="customService">
    <v-header title="意见反馈"></v-header>
    <!--<div class="set-main-list" style="border: none;">-->
      <!--<mt-field label="意见反馈" placeholder="请输入意见反馈内容" type="textarea" rows="4" v-model="temp.content"></mt-field>-->
    <!--</div>-->

    <div class="label-box">
      <div class="form">
        <h3>意见反馈</h3>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="label-btn">
        <a href="javascript:;" @click="submit">提交</a>
      </div>
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
  @import "suggestion.styl";
</style>
