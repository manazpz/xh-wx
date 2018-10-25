<template>
  <div class="account-bingding" ref="account-bingding">
    <v-header title="绑定账号"></v-header>
    <div class="account-binding">
      <div class="tips-icon-img">
        <dl>
          <dt><img src="/static/image/ico_binding_img.png"></dt>
          <dd><p>请绑定小换账号，便于下次快速登录</p></dd>
        </dl>
      </div>
      <div class="account-form">
        <form action="">
          <label>
            <span>手机号码</span>
            <input v-model="phone" @blur="checkphone" class="phone-inp" type="text" value="" placeholder="输入您的手机号码" maxlength="11">
          </label>
          <label>
            <span>验证码</span>
            <input v-model="code" @blur="checkcode" class="verification-inp" type="text"  value="" placeholder="输入验证码" maxlength="8">
            <div @click="validate" class="validate-btn">
              <a href="javascript:;" >点击获取验证码</a>
            </div>
          </label>
        </form>
      </div>
      <div class="clause-and-binding">
        <div class="clause">
          <i @click="clicks($event)"></i>
          <p>我已接受《小换回收条款》及《隐私条款》</p>
        </div>
        <div class="binding binding-btn">
          <a v-if="isCheck == 'Y' && bind == 'Y' " href="javascript:;" class="bind-on" @click="bingding">立即绑定</a>
          <a v-else href="javascript:;">立即绑定</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { updateUserinfos, sendmsg } from 'api/system'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        wait: 60,
        codecheck: '',
        code: '',
        isCheck: 'N',
        bind: 'N',
        openId: '',
        phone: '',
        temp:{
          openId: '',
          phone: ''
        }
      }
    },
    created() {
      this.openId = window.localStorage.getItem("openId")
    },
    methods: {
      validate() {
        var phone = $('.phone-inp');
        var mobileReg  = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (phone.val() == '') {
          phone.focus();
          Toast({
            message: '手机号码不能为空！',
            position: 'bottom',
            duration: 1000
          });
          return
        }
        if (!mobileReg.test(phone.val())) {
          phone.focus();
          Toast({
            message: '您的手机格式错误,请输入11位数移动电话号码',
            position: 'bottom',
            duration: 1000
          });
          return
        }
        if (phone.val() !== '' && mobileReg.test(phone.val())) {
          this.temp.phone = this.phone
          sendmsg(this.temp).then(response => {
            if (response.code === 200) {
              this.codecheck = response.data.code
              this.time()
              setTimeout(function() {
                Toast({
                  message: '短信发送中',
                  position: 'bottom',
                  duration: 1000
                });
              },1000);
            }
          }).catch(() => {
          })
        }
      },
      bingding(){
        this.temp.phone = this.phone
        this.temp.openId = this.openId
        if(this.codecheck === this.code){
          var tar = this
          updateUserinfos(this.temp).then(response => {
            if (response.code === 200) {
              setTimeout(function (){
                tar.$router.push({path:'/user/bingDingSuccess'})
              }, 1000);
            }
          }).catch(() => {
          })
        }else{
          Toast({
            message: '输入验证码错误',
            position: 'bottom',
            duration: 1000
          });
        }

      },
      checkphone(){
        var phone = $('.phone-inp');
        var verification = $('.verification-inp');
        var mobileReg  = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (phone.val().length >= 11) {
          $('.validate-btn').addClass('validate-on');
        } else {
          $('.validate-btn').removeClass('validate-on');
        }
        if (phone.val().length >= 11 && verification.val().length >= 6) {
          $('.binding-btn').find('a').addClass('bind-on');
        } else {
          $('.binding-btn').find('a').removeClass('bind-on');
        };
      },
      time(){
          if (this.wait == 0) {
            $('.validate-btn a').remove();
            $('.validate-btn').html("<a>点击获取验证码</a>");
            this.wait = 60;
          } else {
            $('.validate-btn a').remove();
            $('.validate-btn').html("<b>"+this.wait+"秒</b>");
            this.wait--;
            var tar = this
            setTimeout(function() {
              tar.time()
            },1000)
          }
       },
      checkcode(){
        var phone = $('.phone-inp');
        var verification = $('.verification-inp');
        var mobileReg  = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (phone.val().length >= 11) {
          $('.validate-btn').addClass('validate-on');
        } else {
          $('.validate-btn').removeClass('validate-on');
        }
        if (phone.val().length >= 11 && verification.val().length >= 6) {
          this.bind = 'Y'
        } else {
          this.bind = 'N'
        };
      },
      clicks(ent) {
        if(ent.toElement.className == 'i-on'){
          ent.toElement.classList.remove("i-on")
          this.isCheck = 'N'
        }else{
          ent.toElement.classList.add("i-on")
          this.isCheck = 'Y'
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
  @import "account-bingding.styl";
</style>
