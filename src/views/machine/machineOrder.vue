<template>
  <div class="machineOrder" ref="machineOrder">
    <v-header title="验机列表"></v-header>
    <div class="machine-all">
      <div v-if="isData">
        <div class="machine-main">
          <div v-for="(item1,index1) in data" class="machine-tab-box machine-show" >
            <div class="calculation-main" @click="yanji(item1)">
              <div class="c-des-list" v-if="item1.oldOrder.item.length > 0 && item1.oldOrder.item[0].id != null">
                <div>
                  <span>订单号：{{item1.number}}</span>
                  <span style="float: right">{{item1.createTime | formatDate}}</span>
                </div>
                <div>
                  <span>{{item1.address.name}}</span>
                  <span style="float: right">{{item1.recovery}}</span>
                </div>
                <h3>{{item1.address.phone}}</h3>
                <h3>{{item1.address.areaString}}</h3>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <div style="height: 100%;" v-else>
        <div class="machine-null">
          <img src="/static/image/shopping_trolley.png">
          <p>无验机订单！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from 'components/v-header/v-header'
  import { queryOrderList } from 'api/order'
  import { formatDate } from '../../utils'

  export default {
    data() {
      return {
        data: [],
        isData: false,
        query: {
          checkStatus:'01'
        }
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    methods: {
      getList() {
        queryOrderList(this.query).then(response => {
          if (response.code === 200) {
            this.isData = false
            this.data = response.data.items;
            this.data.forEach(obj=>{
              if(obj.oldOrder.item.length>0) {
                this.isData = true
                return
              }
            })
          }
        }).catch(() => {
        })
      },
      yanji(item) {
        this.$router.push({path: 'machine', query: {id:item.id}})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "machineOrder.styl";
</style>
