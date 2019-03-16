<template>
  <div class="add-payment-method" ref="add-payment-method">
    <v-header title="添加收款方式"></v-header>
    <div class="add-payment-method">
      <div class="add-form">
        <h3>请绑定持卡人本人的银行卡</h3>
        <ul>
          <li>
            <span>开户行名称</span>
            <label for="">
              <input v-model="temp.bank_name" class="bank-inp" type="text" name="" value="" placeholder="输入开户行名称">
            </label>
          </li>
          <li>
            <span>开户行地址</span>
            <label for="">
              <input v-model="temp.bank_adress" class="bank-inp" type="text" name="" value="" placeholder="输入开户行地址">
            </label>
          </li>
          <li>
            <span>持卡人姓名</span>
            <label for="">
              <input v-model="temp.account_name" class="name-inp" type="text" name="" value="" placeholder="输入持卡人姓名">
            </label>
          </li>
          <li>
            <span>银行卡卡号</span>
            <label for="">
              <input v-model="temp.account_no" class="card-inp" type="text" name="" value="" placeholder="输入银行卡卡号">
            </label>
          </li>
        </ul>
      </div>

      <div class="add-payment-btn">
        <a href="javascript:;" @click="bindbank">确定添加</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { insertUserBank, getUserBankinfo } from 'api/system'
  import VHeader from 'components/v-header/v-header'
  import { checkRate } from '../../utils/common'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        temp:{
          id: '',
          type: '',
          openId: '',
          bank_name: '',
          bank_adress: '',
          account_no: '',
          account_name: ''
        }
      }
    },
    created() {
      this.temp.type = this.$route.query.type
      this.temp.openId = window.localStorage.getItem("openId")
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        getUserBankinfo({openId:this.temp.openId}).then(response => {
          if (response.code === 200) {
            if(this.temp.type === ''){
              this.$router.push({path:'/user/paymentmethod'})
            }else{
              this.temp.id = response.data.id
            }
          }
        }).catch(() => {
        })
      },
      bindbank(){
        if(!checkRate(this.temp.account_no)){
          Toast({
            message: '请输入正确银行卡号！',
            position: 'bottom',
            duration: 1000
          });
        }else{
          insertUserBank(this.temp).then(response => {
            if (response.code === 200) {
              Toast({
                message: '绑定成功！',
                position: 'bottom',
                duration: 1000
              });
            }
            this.$router.push({path:'/user/paymentmethod'})
          }).catch(() => {
          })
        }
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "add-payment-method.styl";
</style>
