<template>
  <div class="orderSure" ref="orderSure">
    <v-header title="回收方式"></v-header>
    <div class="recovery-box">
      <ul>
        <li v-for="(item,index) in list">
          <dl>
            <dt>
              <i @click="chicks(item,index,$event)"></i>
              <span>{{item.types}}</span>
            </dt>
            <dd>
              <i></i>
              <span>设为默认上门方式</span>
            </dd>
          </dl>
        </li>
      </ul>
      <div class="confirm-box">
        <a href="javascript:;" title="确认">确认</a>
      </div>
    </div>

  </div>
</template>
<script type="text/ecmascript-6">
  import { recoveryList } from 'api/goods'
  import VHeader from 'components/v-header/v-header'

  export default {
    data() {
      return {
        list: [],
        listQuery: {
          openId: '123456'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        recoveryList(this.listQuery).then(response => {
          if (response.code === 200) {
            this.list = response.data.items
          }
        }).catch(() => {
        })
      },
      chicks(item,index,ent){
        debugger
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
