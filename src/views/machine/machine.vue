<template>
  <div class="machine" ref="machine">
    <v-header title="验机列表"></v-header>
    <div class="machine-all">
      <div v-if="data.length > 0">
        <div class="machine-main">
          <div v-for="(item1,index1) in data" class="machine-tab-box machine-show" >
            <div class="calculation-main">
              <div class="c-des-list" v-if="item1.oldOrder.item.length > 0 && item1.oldOrder.item[0].id != null">
                <h3>订单号：{{item1.number}}</h3>
                <ul v-for="(item2,index2) in item1.oldOrder.item">
                  <li @click="yanji(item2)">
                    <div class="li-left-img">
                      <img :src="item2.imgs[0].url">
                    </div>
                    <div class="li-right-inf">
                      <h4><span>{{item2.goodsName}}</span></h4>
                      <h5>{{item2.parameterStr}}</h5>
                      <h6>估价：<span>￥{{item2.guJia}}</span></h6>
                    </div>
                  </li>
                </ul>
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

  export default {
    data() {
      return {
        data: [],
        query: {
          checkStatus:'01'
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        queryOrderList(this.query).then(response => {
          if (response.code === 200) {
            this.data = response.data.items;
          }
        }).catch(() => {
        })
      },
      yanji(item) {
        this.$router.push({path: 'testMachine', query: {id:item.id,no:item.no,name:item.goodsName,banPrice:item.banPrice}})
      }
    },
    //注册组件
    components: {
      VHeader
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "machine.styl";
</style>
