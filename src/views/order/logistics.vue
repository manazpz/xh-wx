<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="回收方式">
      <link rel="stylesheet" type="text/css" href="../../../static/css/KDNWidget.css">
    </v-header>
  </div>
</template>
<script type="text/ecmascript-6">
  import { queryLogistics } from 'api/order'
  import VHeader from 'components/v-header/v-header'
  import { Toast } from 'mint-ui'

  export default {
    data() {
      return {
        listQuery: {
          id: ''
        }
      }
    },
    created() {
      this.listQuery.id = this.$route.query.id
      this.getList()
    },
    methods: {
      getList() {
        queryLogistics(this.listQuery).then(response => {
          if(response.data.items.length>0){
            KDNWidget.run({
              serviceType: "A",
              expCode: response.data.items[0].com_code,
              expNo: response.data.items[0].log_code,
            })
          }else{
            Toast({
              message: '暂无相关物流信息！',
              position: 'bottom',
              duration: 5000
            });
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
  @import "recovery.styl";
</style>
