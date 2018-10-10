<template>
  <div class="customService" ref="customService">
    <v-header title="客服"></v-header>
    <div class="my-custom-service layer-load">
      <div class="service-main-list">
        <ul>
          <li><a class="telephone-btn" href="javascript:;" @click="dialing" :title="info.phone"><img src="/static/image/icon_li_08.png">400-489-8855</a></li>
          <li><a href="javascript:;" title="在线客服"><img src="/static/image/icon_li_06.png">在线客服</a></li>
        </ul>
        <p class="service-p">服务时间：每日  9：00 - 18：00</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryCustomService } from 'api/system'
  import { MessageBox } from 'mint-ui';

  export default {
    data() {
      return {
        info: undefined
      }
    },
    created() {
      this.getInfo()
    },
    methods: {
      getInfo() {
        queryCustomService().then(response => {
          if (response.code === 200) {
            this.info = response.data.items
          }
        }).catch(() => {
        })
      },
      dialing() {
        MessageBox({
          title: '',
          message: this.info[0].phone,
          showCancelButton: true,
          showCancelButton: true,
          confirmButtonText: '拨号'
        }).then(action => {
          if (action === 'confirm') {
            debugger
          }
        });
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "customService.styl";
</style>
