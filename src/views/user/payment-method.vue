<template>
  <div class="payment-method" ref="payment-method">
    <v-header title="已绑收款方式"></v-header>
    <div class="payment-method">
      <div class="add-form">
        <h3>已绑定银行卡信息</h3>
        <ul>
          <li>
            <span>开户行名称：{{list.bankName}}</span>
          </li>
          <li>
            <span>开户行地址：{{list.bankAddress}}</span>
          </li>
          <li>
            <span>持卡人姓名：{{list.accountName}}</span>
          </li>
          <li>
            <span>银行卡卡号：{{list.accountNo}}</span>
          </li>
        </ul>
      </div>

      <div class="add-payment-btn">
        <a href="javascript:;" @click="changebind">换绑</a>
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
        list: {},
        temp:{
          bankName: '',
          bankAddress: '',
          accountNo: '',
          accountName: ''
        }
      }
    },
    created() {
      this.temp.openId = window.localStorage.getItem("openId")
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        getUserBankinfo({openId:this.temp.openId}).then(response => {
          if (response.code === 200) {
              this.list = response.data
              this.list.accountNo  = this.list.accountNo.replace(/^(\d{4})\d+(\d{4})$/,'$1****$2')
          }
        }).catch(() => {
        })
      },
      changebind(){
        this.$router.push({path:'/user/addpaymentmethod', query: {type: 'update'}})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "payment-method.styl";
</style>
