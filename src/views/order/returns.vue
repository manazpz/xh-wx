<template>
  <div class="payment" ref="payment">
    <v-header title="退款申请"></v-header>
      <div class="refund-main">
        <form action="">
          <h3>退款原因*</h3>
          <select v-model="temp.check">
            <option value="卖家发错货">卖家发错货</option>
            <option value="买错/不想要了">买错/不想要了</option>
            <option value="卖家无货">卖家无货</option>
            <option value="其他">其他</option>
          </select>
          <h3>退款说明</h3>
          <textarea v-model="temp.reason" cols="30" rows="10" placeholder="请您输入退款说明"></textarea>
        </form>
      </div>
      <div class="submission-btn">
        <a href="javascript:;" @click="submit">申请提交</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { insertReturn } from 'api/order'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        temp:{
          check: '',
          reason: '',
          id: '',
          openId: ''
        }
      }
    },
    created() {
      this.temp.id = this.$route.query.id
      this.temp.openId = window.localStorage.getItem("openId")
    },
    methods: {
      submit(){
        var tar = this
        insertReturn(this.temp).then(response => {
          if (response.code === 200) {
            Toast({
              message: '已提交退货申请！',
              position: 'bottom',
              duration: 5000
            });
            setTimeout(() => {
              tar.$router.push({path: '/orderList', query: {}})
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
  @import "returns.styl";
</style>
